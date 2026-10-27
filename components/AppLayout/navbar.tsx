"use client";

import { Grid2X2, House, Menu, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandSection } from "@/components/AppLayout/brand-section";
import {
  MobileNavigationLinks,
  PrimaryNavigationSection,
} from "@/components/AppLayout/center-section";
import {
  ActionsSection,
  SearchField,
} from "@/components/AppLayout/right-section";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryLinks } from "@/lib/Links";

function MobileBottomNav({ openMenu }: { openMenu: () => void }) {
  const items = [
    { label: "Home", href: "/", icon: <House /> },
    { label: "Account", href: "/account", icon: <UserRound /> },
    { label: "Categories", icon: <Grid2X2 />, onClick: openMenu },
    { label: "Cart", href: "/cart", icon: <ShoppingBag />, count: 0 },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 px-1 pb-[max(env(safe-area-inset-bottom),0.25rem)] pt-1 backdrop-blur lg:hidden "
    >
      {items.map((item) => {
        const content = (
          <>
            <span className="relative inline-flex">
              {item.icon}
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-semibold leading-none text-white">
                  {item.count}
                </span>
              )}
            </span>
            <span className="text-[11px] leading-none">{item.label}</span>
          </>
        );
        const className =
          "flex min-h-12 flex-col items-center justify-center gap-1 font-semibold text-muted-foreground transition-colors hover:text-red-800 dark:hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

        return item.onClick ? (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={className}
            aria-label="Open categories"
          >
            {content}
          </button>
        ) : (
          <Link key={item.label} href={item.href ?? "/"} className={className}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-[#eae6e6] py-1.5 dark:bg-accent lg:py-4">
        <div className="mx-auto hidden max-w-[1920px] px-6 lg:block xl:px-10">
          <div className="grid min-h-20 grid-cols-[112px_minmax(0,1fr)_auto] items-center gap-x-5">
            <div className="flex items-center" data-navbar-section="brand">
              <BrandSection />
            </div>
            <PrimaryNavigationSection items={primaryLinks} />
            <ActionsSection />
          </div>
        </div>

        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4 lg:hidden">
          <SheetTrigger
            aria-label="Open navigation menu"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="justify-self-start"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <BrandSection className="justify-self-center" />
          <div className="flex items-center justify-self-end gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <SheetContent side="left" className="lg:hidden">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle>
            <BrandSection />
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Everything you need, in one place.
          </p>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
          <SearchField className="mb-4" />
          <nav aria-label="Main navigation" className="space-y-5">
            <MobileNavigationLinks
              items={primaryLinks}
              setSheetOpen={setSheetOpen}
            />
          </nav>
        </div>
      </SheetContent>

      <MobileBottomNav openMenu={() => setSheetOpen(true)} />
    </Sheet>
  );
}
