import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";
import { CLOSE_ANIMATION_DURATION } from "@/shared/constants/animation";
import { useRoomStore } from "@/shared/stores/room";

const SWIPE_DELTA = 80;

export const useSwipeToClose = (onClose?: () => void) => {
  const { setRoom } = useRoomStore();
  const { stack } = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    if (isClosing) return;
    onClose?.();
    setIsClosing(true);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (!isClosing) return;
    const timer = setTimeout(() => {
      setRoom(null);
      stack.pop();
    }, CLOSE_ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [isClosing, setRoom, stack]);

  const onTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (startXRef.current === null) return;
      const endX = e.changedTouches[0]?.clientX ?? startXRef.current;
      if (endX - startXRef.current >= SWIPE_DELTA) {
        triggerClose();
      }
      startXRef.current = null;
    },
    [triggerClose]
  );

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
  }, []);

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (startXRef.current === null) return;
      if (e.clientX - startXRef.current >= SWIPE_DELTA) {
        triggerClose();
      }
      startXRef.current = null;
    },
    [triggerClose]
  );

  const mergedRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
  }, []);

  return {
    handlers: {
      ref: mergedRef,
      onTouchStart,
      onTouchEnd,
      onMouseDown,
      onMouseUp,
    },
    triggerClose,
    animationClass: isClosing ? "slide-out-right" : "slide-in-right",
  };
};
