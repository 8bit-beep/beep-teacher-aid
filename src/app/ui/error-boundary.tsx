import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from "react";
import { Button } from "@beep-ds/ui";
import logo from "@/assets/logo.svg";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-full flex-col items-center justify-center bg-greyscale-10 px-6 text-center">
          <img src={logo} alt="Logo" width={120} height={120} className="mb-6" />
          <h1 className="text-h2 font-bold mb-2">문제가 발생했습니다</h1>
          <p className="mb-6 text-greyscale-50 text-center">
            예기치 못한 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          <Button buttonType="primary" buttonSize="large" onClick={this.handleReset}>
            다시 시도
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
