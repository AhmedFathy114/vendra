import { Home, LayoutGrid } from "lucide-react";
import Link from "next/link";

function NotFoundCategory() {
  return (
    <>
      <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <LayoutGrid
            className="size-7 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Category not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          We couldn&apos;t find the category you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Home className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </section>
    </>
  );
}

export default NotFoundCategory;
