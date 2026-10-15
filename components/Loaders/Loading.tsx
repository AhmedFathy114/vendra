"use client";

type LoadingProps = {
  isExiting?: boolean;
};

export default function Loading({ isExiting = false }: LoadingProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden bg-background text-foreground transition-opacity duration-700 ease-in-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative flex flex-col items-center transition-all duration-700 ease-in-out ${
          isExiting
            ? "translate-y-2 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        {/* Vendra Brand */}
        <div className="relative z-10 flex items-center gap-1">
          <span className="text-5xl font-black tracking-tight text-foreground sm:text-6xl">
            VEN
          </span>

          <span className="text-5xl font-black tracking-tight text-red-600 sm:text-6xl">
            DRA
          </span>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Your style, your world
        </p>

        {/* Loading Bar */}
        <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full w-1/3 rounded-full bg-red-600"
            style={{
              animation: "vendra-progress 1.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes vendra-progress {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(440%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vendra-loading-bar {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
