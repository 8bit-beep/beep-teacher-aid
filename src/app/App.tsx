import "./styles/app-shell.css";
import { useEffect, useRef, type CSSProperties, type UIEvent } from "react";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { SafeAreaProvider, useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import { RouteProvider, Router, useRouter } from "@b1nd/aid-kit/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@beep-ds/ui";
import { ToastContainer } from "@cher1shrxd/toast";
import { AuthProvider, useAuthState } from "@/features/auth";
import { TAB_PATHS } from "@/shared/config/tabs";
import { queryClient } from "@/shared/lib/query-refresh";
import { createScrollCollapse } from "@/shared/lib/scroll-collapse";
import { useHeaderStore } from "@/shared/stores/header";
import Header from "@/widgets/header/ui/header";
import Tabbar from "@/widgets/tabbar/ui/tabbar";
import { routes } from "./routes";
import { AuthGate } from "./ui/auth-gate";
import { ErrorBoundary } from "./ui/error-boundary";

type SafeAreaProperties = CSSProperties & {
  "--native-safe-area-top": string;
  "--native-safe-area-bottom": string;
};

const VALID_TAB_PATHS = routes.tabs.map(tab => tab.path);

const scrollCollapse = createScrollCollapse();

function AppShell() {
  const { top, bottom } = useSafeArea();
  const { tab, stack } = useRouter();
  const { state } = useAuthState();
  const isAuthenticated = state.status === "authenticated";
  const isStackOpen = stack.current.length > 0;
  const setHeaderCollapsed = useHeaderStore(state => state.setCollapsed);
  const currentTab = tab.current;
  const shellRef = useRef<HTMLDivElement>(null);
  const safeAreaStyle: SafeAreaProperties = {
    "--native-safe-area-top": `${top}px`,
    "--native-safe-area-bottom": `${bottom}px`,
  };

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--native-safe-area-top", `${top}px`);
    rootStyle.setProperty("--native-safe-area-bottom", `${bottom}px`);
  }, [top, bottom]);

  // 탭을 바꾸면 새 목록은 맨 위에서 시작하므로 헤더를 펼친다.
  useEffect(() => {
    scrollCollapse.reset(shellRef.current);
    setHeaderCollapsed(false);
  }, [currentTab, setHeaderCollapsed]);

  // 스크롤은 main 안쪽의 여러 overflow 컨테이너에서 일어나므로 캡처 단계에서 받는다.
  // 스택 화면도 main의 자손이라 그 스크롤은 무시한다.
  const handleScrollCapture = (event: UIEvent<HTMLElement>) => {
    if (isStackOpen || !(event.target instanceof HTMLElement)) {
      return;
    }

    // 접힘 정도는 스크롤 위치에 비례해 CSS 변수로 매 프레임 반영하고,
    // React 상태는 완전히 접혔는지만 갖는다(포커스·보조기기 처리용).
    const progress = scrollCollapse.onScroll(shellRef.current, event.target);

    setHeaderCollapsed(progress >= 1);
  };

  useEffect(() => {
    if (!VALID_TAB_PATHS.includes(tab.current)) {
      tab.move(TAB_PATHS.attendance);
    }
    for (let i = 0; i < stack.current.length; i += 1) {
      stack.pop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={shellRef} className="app-shell bg-greyscale-10" style={safeAreaStyle}>
      <div className="toast-layer">
        <ToastContainer />
      </div>
      <ModalProvider />
      {isAuthenticated && <Header />}
      <main className="app-shell__scroll" onScrollCapture={handleScrollCapture}>
        <ErrorBoundary>
          <AuthGate>
            <Router routes={routes} />
          </AuthGate>
        </ErrorBoundary>
      </main>
      {isAuthenticated && !isStackOpen && <Tabbar />}
    </div>
  );
}

function App() {
  return (
    <BridgeProvider>
      <SafeAreaProvider>
        <AppStateProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RouteProvider routes={routes}>
                <AppShell />
              </RouteProvider>
            </AuthProvider>
          </QueryClientProvider>
        </AppStateProvider>
      </SafeAreaProvider>
    </BridgeProvider>
  );
}

export default App;
