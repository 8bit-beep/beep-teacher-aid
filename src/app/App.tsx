import "./styles/app-shell.css";
import { useEffect, type CSSProperties } from "react";
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

function AppShell() {
  const { top, bottom } = useSafeArea();
  const { tab, stack } = useRouter();
  const { state } = useAuthState();
  const isAuthenticated = state.status === "authenticated";
  const isStackOpen = stack.current.length > 0;
  const safeAreaStyle: SafeAreaProperties = {
    "--native-safe-area-top": `${top}px`,
    "--native-safe-area-bottom": `${bottom}px`,
  };

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--native-safe-area-top", `${top}px`);
    rootStyle.setProperty("--native-safe-area-bottom", `${bottom}px`);
  }, [top, bottom]);

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
    <div className="app-shell bg-greyscale-10" style={safeAreaStyle}>
      <ToastContainer />
      <ModalProvider />
      {isAuthenticated && <Header />}
      <main className="app-shell__scroll">
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
