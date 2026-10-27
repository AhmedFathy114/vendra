import { Button } from "@base-ui/react";
import { CircleAlert, RefreshCw } from "lucide-react";

type ProfileErrorProps = {
  error: Error | null;
  isRetrying: boolean;
  onRetry: () => void;
};

function ProfileError({ error, isRetrying, onRetry }: ProfileErrorProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <CircleAlert className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Couldn&apos;t load your profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We couldn&apos;t retrieve your account details. Please try again.
        </p>
        {error instanceof Error && (
          <p className="mt-3 wrap-break-word text-xs text-destructive">
            {error.message}
          </p>
        )}
        <Button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 h-10 rounded-xl px-4"
        >
          <RefreshCw
            className={isRetrying ? "size-4 animate-spin" : "size-4"}
            aria-hidden="true"
          />
          {isRetrying ? "Retrying..." : "Try again"}
        </Button>
      </div>
    </section>
  );
}

export default ProfileError;
