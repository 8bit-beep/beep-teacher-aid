import { useMemo, type PropsWithChildren } from "react";
import { Actions, useBridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { RouteContext, Router, type ContextType, type Routes } from "@b1nd/aid-kit/navigation";
import {
  AuthStatusScreen,
  isRetriableAuthError,
  useAuthState,
  type AuthErrorReason,
} from "@/features/auth";

const ERROR_COPY: Record<AuthErrorReason, { title: string; description: string }> = {
  "no-token": {
    title: "인증 정보가 없어요",
    description: "도담 앱에서 Beep을 다시 열어 주세요.",
  },
  "session-expired": {
    title: "로그인이 만료됐어요",
    description: "도담 앱에서 Beep을 다시 열어 주세요.",
  },
  "forbidden-role": {
    title: "교사 계정만 이용할 수 있어요",
    description: "학생은 Beep 학생 앱을 이용해 주세요.",
  },
  network: {
    title: "연결하지 못했어요",
    description: "네트워크 연결을 확인한 뒤 다시 시도해 주세요.",
  },
  unknown: {
    title: "인증하지 못했어요",
    description: "잠시 후 다시 시도해 주세요.",
  },
};

const AUTH_ERROR_PATH = "/auth-error";

const noop = () => {};

// 앱 라우터 상태(탭/스택)를 건드리지 않도록 오류 화면 전용 라우트 컨텍스트를 따로 둔다.
const AUTH_ERROR_ROUTE_CONTEXT: ContextType = {
  stack: [],
  tab: AUTH_ERROR_PATH,
  move: noop,
  push: noop,
  pop: noop,
};

type AuthErrorScreenProps = {
  reason: AuthErrorReason;
  onRetry: () => void;
};

/**
 * 네이티브 뒤로가기(NAVIGATION_POP) 응답과 가장자리 스와이프는 Router 안에서만
 * 등록된다. 오류 화면도 Router로 렌더링해 일반 화면과 같은 뒤로가기를 쓴다.
 */
const AuthErrorScreen = ({ reason, onRetry }: AuthErrorScreenProps) => {
  const { send } = useBridgeProvider();

  const routes = useMemo<Routes>(() => {
    const { title, description } = ERROR_COPY[reason];

    return {
      tabs: [
        {
          path: AUTH_ERROR_PATH,
          element: () => (
            <AuthStatusScreen
              title={title}
              description={description}
              onRetry={isRetriableAuthError(reason) ? onRetry : undefined}
              onBack={() => send(Actions.NAVIGATION_POP)}
            />
          ),
        },
      ],
      stacks: [],
    };
  }, [reason, onRetry, send]);

  return (
    <RouteContext.Provider value={AUTH_ERROR_ROUTE_CONTEXT}>
      <Router routes={routes} />
    </RouteContext.Provider>
  );
};

/** 인증이 끝나기 전까지 앱 화면 대신 상태 화면을 보여준다. 앱 셸 안쪽에 놓인다. */
export const AuthGate = ({ children }: PropsWithChildren) => {
  const { state, retry } = useAuthState();

  if (state.status === "loading") {
    return (
      <AuthStatusScreen
        title="사용자 정보를 확인하고 있어요"
        description="잠시만 기다려 주세요."
        loading
      />
    );
  }

  if (state.status === "error") {
    return <AuthErrorScreen reason={state.reason} onRetry={retry} />;
  }

  return children;
};
