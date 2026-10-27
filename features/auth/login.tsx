"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  username: string;
  password: string;
};

const inputClassName =
  "h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

function getSafeDestination(callbackUrl: string | null) {
  if (!callbackUrl) return "/account";

  try {
    const url = new URL(callbackUrl, window.location.origin);

    if (url.origin !== window.location.origin) return "/account";

    return `${url.pathname}${url.search}${url.hash}` || "/account";
  } catch {
    return "/account";
  }
}

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  async function onSubmit({ username, password }: LoginFormValues) {
    clearErrors("root");

    try {
      const result = await signIn("credentials", {
        username: username.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("root", {
          message: "Invalid username or password. Please try again.",
        });
        return;
      }

      const callbackUrl = new URLSearchParams(window.location.search).get(
        "callbackUrl",
      );

      router.replace(getSafeDestination(callbackUrl));
    } catch {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-md items-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-7 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Vendra Account
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Sign in with your username to continue.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              autoFocus
              placeholder="emilys"
              className={inputClassName}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username?.message && (
              <p id="username-error" className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className={inputClassName}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password?.message && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root?.message && (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl text-sm font-semibold cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
