import { useCallback, useRef } from "react";
import { Actions, useBridgeProvider, useBridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";
import { AidBridgeError, getBridgeData } from "./aid-bridge";

const FILE_SAVE_TIMEOUT_MS = 30_000;

export interface FileSavePayload {
  url: string;
  fileName?: string;
}

export const isNativeWebView = () =>
  typeof window !== "undefined" && "ReactNativeWebView" in window;

export const downloadFileInBrowser = (url: string, fileName = "") => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export const useFileSave = () => {
  const { send } = useBridgeProvider();
  const pendingRef = useRef<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);

  useBridgeResponse(Actions.FILE_SAVE, async response => {
    const pending = pendingRef.current;
    if (!pending) {
      return {};
    }

    pendingRef.current = null;
    clearTimeout(pending.timer);

    try {
      const data = getBridgeData(response);
      pending.resolve(data);
    } catch (error) {
      pending.reject(
        error instanceof AidBridgeError
          ? error
          : new AidBridgeError("파일 저장에 실패했어요. 다시 시도해 주세요.")
      );
    }

    return {};
  });

  const saveFile = useCallback(
    async ({ url, fileName }: FileSavePayload) => {
      if (!isNativeWebView()) {
        downloadFileInBrowser(url, fileName);
        return;
      }

      if (pendingRef.current) {
        clearTimeout(pendingRef.current.timer);
        pendingRef.current.reject(new AidBridgeError("요청이 취소됐어요.", "CANCELLED"));
        pendingRef.current = null;
      }

      return await new Promise<unknown>((resolve, reject) => {
        const timer = setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = null;
            reject(new AidBridgeError("요청 시간이 초과됐어요. 다시 시도해 주세요.", "TIMEOUT"));
          }
        }, FILE_SAVE_TIMEOUT_MS);

        pendingRef.current = { resolve, reject, timer };
        send(Actions.FILE_SAVE, fileName ? { url, fileName } : { url });
      });
    },
    [send]
  );

  return { saveFile };
};
