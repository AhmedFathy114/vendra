"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

type LoadingModelProps = {
  message?: string;
  duration?: number;
  onHidden?: () => void;
};

export default function LoadingModel({
  message,
  duration = 900,
  onHidden,
}: LoadingModelProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const onHiddenRef = useRef(onHidden);
  useEffect(() => {
    onHiddenRef.current = onHidden;
  }, [onHidden]);

  useEffect(() => {
    if (duration <= 0) return;

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, duration);

    const hideTimer = window.setTimeout(() => {
      setIsHidden(true);
      onHiddenRef.current?.();
    }, duration + 500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [duration]);

  if (isHidden) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message ?? "Loading Vendra"}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background/85 backdrop-blur-md transition-opacity duration-500 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative flex flex-col items-center px-6 text-center transition-all duration-500 ease-out ${
          isExiting
            ? "translate-y-2 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute top-2 size-44 rounded-full bg-red-600/10 blur-3xl"
        />

        <div className="relative size-32">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-l-red-600 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-red-600/40 border-b-red-600/40 animate-spin-reverse" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.35)] animate-pulse">
              <ShoppingBag
                className="size-8"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-foreground">
            {message ?? (
              <>
                VENDRA<span className="text-red-600">.</span>
              </>
            )}
          </h2>

          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Your style, your choice
          </p>

          <div className="flex gap-2" aria-hidden="true">
            <span className="size-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.3s]" />
            <span className="size-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.15s]" />
            <span className="size-2 rounded-full bg-red-600 animate-bounce" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 2.5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin,
          .animate-spin-reverse,
          .animate-bounce,
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
