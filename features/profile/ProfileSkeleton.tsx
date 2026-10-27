function ProfileSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading profile"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10"
    >
      <span className="sr-only">Loading profile</span>

      <div className="mb-8 space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
        <div className="h-9 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="mx-auto size-28 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto mt-4 h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-4 h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="mt-6 space-y-3 border-t border-border pt-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-full animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="h-9 w-52 animate-pulse rounded bg-muted" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: index === 0 ? 8 : 4 }).map(
                  (_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="h-18 animate-pulse rounded-2xl bg-muted/70"
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileSkeleton;
