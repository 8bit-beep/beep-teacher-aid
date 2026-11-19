import { colors } from "@beep-ds/colors";
import { Button } from "@beep-ds/ui";

type AuthStatusScreenProps = {
  title: string;
  description: string;
  loading?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
};

export const AuthStatusScreen = ({
  title,
  description,
  loading = false,
  onRetry,
  onBack,
}: AuthStatusScreenProps) => {
  return (
    // 앱 셸의 스크롤 영역(.app-shell__scroll) 안에 놓이므로 dvh가 아니라 부모 높이를 채운다.
    <div
      className="flex min-h-full flex-col items-center justify-center bg-greyscale-10 px-6 text-center"
      role={loading ? "status" : "alert"}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        {loading && (
          <div
            className="mb-2 h-8 w-8 animate-spin rounded-full border-3 border-greyscale-20"
            style={{ borderTopColor: colors.blue.light }}
            aria-label="로딩 중"
          />
        )}
        <h1 className="text-h3 font-bold text-greyscale-90">{title}</h1>
        <p className="text-body2 leading-6 text-greyscale-60">{description}</p>
        {(onRetry || onBack) && (
          <div className="mt-3 flex w-full flex-col items-center gap-2">
            {onRetry && (
              <Button buttonType="primary" buttonSize="large" onClick={onRetry}>
                다시 시도
              </Button>
            )}
            {onBack && (
              <Button buttonType={onRetry ? "text" : "primary"} buttonSize="large" onClick={onBack}>
                뒤로가기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
