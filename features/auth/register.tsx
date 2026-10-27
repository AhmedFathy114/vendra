"use client";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/queries/useRegister";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const inputClassName =
  "h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

function Register() {
  const { registeredUser, registerUser, isRegistering } = useRegister();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({
    firstName,
    lastName,
    username,
    email,
    password,
  }: RegisterFormValues) {
    clearErrors("root");

    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });
    } catch {
      setError("root", {
        message: "Could not create your account. Please try again.",
      });
    }
  }

  if (registeredUser) {
    return (
      <section className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-md items-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Vendra Account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Account created
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Thanks, {registeredUser.firstName}. Your registration request was
            completed successfully.
          </p>

          <p className="mt-5 rounded-xl bg-muted px-4 py-3 text-xs leading-5 text-muted-foreground">
            This is a DummyJSON demo. New accounts are not saved permanently, so
            use the demo account to sign in.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Go to sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-xl items-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-7 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Vendra Account
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Create your Vendra account to start shopping.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                autoFocus
                placeholder="Emily"
                className={inputClassName}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName?.message && (
                <p id="firstName-error" className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Johnson"
                className={inputClassName}
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName?.message && (
                <p id="lastName-error" className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="emilys"
              className={inputClassName}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message:
                    "Use letters, numbers, dots, underscores, or hyphens only",
                },
              })}
            />
            {errors.username?.message && (
              <p id="username-error" className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClassName}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email?.message && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
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
              autoComplete="new-password"
              placeholder="Create a password"
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className={inputClassName}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword?.message && (
              <p
                id="confirmPassword-error"
                className="text-sm text-destructive"
              >
                {errors.confirmPassword.message}
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
            disabled={isRegistering}
            className="h-11 w-full rounded-xl text-sm font-semibold"
          >
            {isRegistering ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Demo only: new accounts are not saved by DummyJSON.
        </p>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
