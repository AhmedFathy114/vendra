"use client";

import Link from "next/link";
import { ArrowLeft, House, RotateCcw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <div
      role="alert"
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
            500
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold tracking-widest text-white shadow-lg shadow-blue-600/20">
              <TriangleAlert className="size-4" />
              ERROR
            </span>
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Unexpected Error
        </p>

        <h1
          className="text-3xl font-bold tracking-tight
           text-black dark:text-white sm:text-4xl"
        >
          Something went wrong
        </h1>
        <p className="font-semibold text-neutral-800 dark:text-neutral-200 pt-4">
          {error.name} : {error.message}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3
                text-sm font-semibold text-white transition hover:bg-neutral-800
                dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
          >
            <RotateCcw className="size-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2
                rounded-xl border border-neutral-200 bg-white px-6 py-3
                text-sm font-semibold text-black transition
                hover:border-blue-600 hover:text-blue-600
                dark:border-neutral-700 dark:bg-neutral-900
                dark:text-white dark:hover:border-blue-500 cursor-pointer"
          >
            <House className="size-4" />
            Back to Home
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
