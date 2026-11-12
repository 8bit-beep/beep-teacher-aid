import { ModalProvider } from "@beep-ds/ui";
import { ToastContainer } from "@cher1shrxd/toast";
import "./styles/app-shell.css";

function App() {
  return (
    <div className="app-shell bg-greyscale-10">
      <ToastContainer />
      <ModalProvider />
      <main className="app-shell__scroll" />
    </div>
  );
}

export default App;
