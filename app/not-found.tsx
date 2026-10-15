import Link from "next/link";
import { ArrowLeft, House, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center
      bg-white px-4 text-black
      dark:bg-neutral-950 dark:text-white"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative mb-8">
          <span
            className="text-[140px] font-black leading-none
              tracking-tighter text-neutral-100
              dark:text-neutral-800 sm:text-[200px]"
          >
            404
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold tracking-widest text-white shadow-lg shadow-blue-600/20">
              OOPS!
            </span>
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Page Not Found
        </p>

        <h1
          className="text-3xl font-bold tracking-tight
           text-black dark:text-white sm:text-4xl"
        >
          Looks like you’re lost
        </h1>
        <p
          className="mt-4 max-w-md text-sm leading-7
              text-neutral-500 dark:text-neutral-400 sm:text-base"
        >
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to shopping.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <House className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2
                rounded-xl border border-neutral-200 bg-white px-6 py-3
                text-sm font-semibold text-black transition
                hover:border-blue-600 hover:text-blue-600
                dark:border-neutral-700 dark:bg-neutral-900
                dark:text-white dark:hover:border-blue-500"
          >
            <Search className="size-4" />
            Explore Products
            <ArrowLeft className="size-4 rotate-180" />
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm text-neutral-400">
          <span className="font-black italic tracking-tight text-black dark:text-white">
            Vendra
          </span>
          <span>·</span>
          <span>Your style, your choice.</span>
        </div>
      </div>
    </div>
  );
}
