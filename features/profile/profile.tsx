"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import type { UserAddress } from "@/types/auth";
import {
  BriefcaseBusiness,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import ProfileSkeleton from "./ProfileSkeleton";
import ProfileError from "./ProfileError";
import { dateFormatter } from "@/lib/utils";
import LoadingModel from "@/components/Loaders/LoadingModel";

type InfoItemProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

type SectionHeadingProps = {
  icon: LucideIcon;
  title: string;
  id: string;
};

function displayValue(value?: string | number | null) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

function capitalize(value: string) {
  if (!value) return "Not provided";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? displayValue(value)
    : dateFormatter.format(date);
}

function formatAddress(address: UserAddress) {
  const cityLine = [
    address.city,
    address.state,
    address.stateCode,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const parts = [address.address, cityLine, address.country].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : "Not provided";
}

function InfoItem({ label, value, className = "" }: InfoItemProps) {
  return (
    <div className={`rounded-2xl bg-muted/50 p-3.5 ${className}`}>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, id }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Profile() {
  const { profile, isLoading, isError, error, isFetching, refetch } =
    useUserProfile();

  if (isLoading)
    return (
      <>
        <LoadingModel duration={600} message="Loading Profile" />
        <ProfileSkeleton />;
      </>
    );

  if (isError || !profile) {
    return (
      <ProfileError
        error={error instanceof Error ? error : null}
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const homeAddress = formatAddress(profile.address);
  const companyAddress = formatAddress(profile.company.address);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            My account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            View your personal information, address, and work details.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
            <div className="mx-auto size-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
              <Image
                src={profile.image}
                alt={fullName}
                width={112}
                height={112}
                sizes="112px"
                priority
                className="size-full object-cover"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold tracking-tight">{fullName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                @{profile.username}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                {capitalize(profile.role)}
              </span>
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-5">
              <a
                href={`mailto:${profile.email}`}
                className="flex min-w-0 items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{profile.email}</span>
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{profile.phone}</span>
              </a>

              <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {profile.address.city}, {profile.address.country}
                </span>
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="mt-6 h-10 w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Log out
            </Button>
          </aside>

          <div className="space-y-6">
            <section
              aria-labelledby="personal-information-heading"
              className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <SectionHeading
                icon={UserRound}
                title="Personal information"
                id="personal-information-heading"
              />

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoItem label="Full name" value={fullName} />
                <InfoItem label="Username" value={`@${profile.username}`} />
                <InfoItem label="Age" value={`${profile.age} years`} />
                <InfoItem label="Gender" value={capitalize(profile.gender)} />
                <InfoItem
                  label="Birth date"
                  value={formatDate(profile.birthDate)}
                />
                <InfoItem label="Blood group" value={profile.bloodGroup} />
                <InfoItem
                  label="Eye color"
                  value={capitalize(profile.eyeColor)}
                />
                <InfoItem
                  label="Hair"
                  value={`${capitalize(profile.hair.color)} · ${capitalize(
                    profile.hair.type,
                  )}`}
                />
                <InfoItem
                  label="Height"
                  value={`${Math.round(profile.height)} cm`}
                />
                <InfoItem
                  label="Weight"
                  value={`${profile.weight.toFixed(1)} kg`}
                />
              </dl>
            </section>

            <section
              aria-labelledby="address-heading"
              className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <SectionHeading
                icon={MapPin}
                title="Address"
                id="address-heading"
              />

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoItem
                  label="Street"
                  value={displayValue(profile.address.address)}
                  className="sm:col-span-2"
                />
                <InfoItem
                  label="City"
                  value={displayValue(profile.address.city)}
                />
                <InfoItem
                  label="State"
                  value={`${displayValue(profile.address.state)}${
                    profile.address.stateCode
                      ? ` (${profile.address.stateCode})`
                      : ""
                  }`}
                />
                <InfoItem
                  label="Postal code"
                  value={displayValue(profile.address.postalCode)}
                />
                <InfoItem
                  label="Country"
                  value={displayValue(profile.address.country)}
                />
                <InfoItem
                  label="Full address"
                  value={homeAddress}
                  className="sm:col-span-2"
                />
              </dl>
            </section>

            <section
              aria-labelledby="work-education-heading"
              className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <SectionHeading
                icon={BriefcaseBusiness}
                title="Work & education"
                id="work-education-heading"
              />

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoItem
                  label="Company"
                  value={displayValue(profile.company.name)}
                />
                <InfoItem
                  label="Department"
                  value={displayValue(profile.company.department)}
                />
                <InfoItem
                  label="Job title"
                  value={displayValue(profile.company.title)}
                />
                <InfoItem
                  label="University"
                  value={displayValue(profile.university)}
                />
                <InfoItem
                  label="Company address"
                  value={companyAddress}
                  className="sm:col-span-2"
                />
              </dl>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <GraduationCap className="size-4" aria-hidden="true" />
                <span>
                  Education and work details are shown from your account.
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
