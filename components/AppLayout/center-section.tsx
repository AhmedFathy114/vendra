"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavigationItem, NavigationLink } from "@/types/type";

function DesktopNavigationLinks({ items }: { items: NavigationItem[] }) {
  return (
    <ul className="flex flex-col gap-1 lg:w-full lg:max-w-5xl lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-5 xl:gap-x-7">
      {items.map((item) => (
        <li key={item.title} className="py-1.5 lg:py-0">
          {item.children?.length ? (
            <DropdownMenu>
              <div className="flex items-center">
                <Link
                  href={item.slug || "/"}
                  className="inline-flex min-h-9 items-center rounded-md px-2 text-sm font-semibold text-foreground transition-colors hover:text-red-800 dark:hover:text-red-400 lg:px-1"
                >
                  {item.title}
                </Link>

                <DropdownMenuTrigger
                  openOnHover
                  delay={150}
                  closeDelay={180}
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Open ${item.title} submenu`}
                      className="size-8 shrink-0 cursor-pointer hover:bg-transparent!"
                    />
                  }
                >
                  <ChevronDown className="size-4" aria-hidden="true" />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent
                align="start"
                className="min-w-48 py-3 ps-4 origin-top
                  data-[state=open]:animate-in
                  data-[state=open]:fade-in-0
                  data-[state=open]:zoom-in-95
                  data-[state=closed]:animate-out
                  data-[state=closed]:fade-out-0
                  data-[state=closed]:zoom-out-95
                  duration-200"
              >
                {item.children.map((child: NavigationLink) => (
                  <DropdownMenuItem
                    key={`${child.title}-${child.slug}`}
                    className="cursor-pointer py-2 font-semibold transition-all duration-200 ease-out hover:translate-x-1 hover:text-red-800! focus-visible:translate-x-1 focus-visible:text-red-800! dark:hover:text-red-400! dark:focus-visible:text-red-400!"
                    render={<Link href={child.slug || "/"} />}
                  >
                    {child.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              className="inline-flex min-h-9 items-center rounded-md px-2 text-sm font-semibold transition-colors hover:text-red-800 dark:hover:text-red-400 lg:px-1"
              href={item.slug || "/"}
            >
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PrimaryNavigationSection({
  items,
}: {
  items: NavigationItem[];
}) {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex min-w-0 justify-center"
      data-navbar-section="primary-navigation"
    >
      <DesktopNavigationLinks items={items} />
    </nav>
  );
}

export function MobileNavigationLinks({
  items,
  setSheetOpen,
}: {
  items: NavigationItem[];
  setSheetOpen: (sheetOpen: boolean) => void;
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const expanded = Boolean(expandedItems[item.title]);
        const submenuId = `mobile-nav-${item.title
          .toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll("&", "and")}`;

        return (
          <li key={item.title} className="py-1.5">
            {item.children?.length ? (
              <div>
                <div className="flex min-h-10 items-center">
                  <Link
                    href={item.slug || "/"}
                    onClick={() => setSheetOpen(false)}
                    className="flex min-h-10 flex-1 items-center rounded-md px-2 text-sm font-semibold transition-colors hover:bg-muted hover:text-red-800 dark:hover:text-red-400"
                  >
                    {item.title}
                  </Link>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={submenuId}
                    aria-label={`Toggle ${item.title} submenu`}
                    className="flex size-10 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
                    onClick={() =>
                      setExpandedItems((previous) => ({
                        ...previous,
                        [item.title]: !previous[item.title],
                      }))
                    }
                  >
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <ul
                  id={submenuId}
                  hidden={!expanded}
                  className="mt-1 ml-3 space-y-1 border-l border-border pl-3"
                >
                  {item.children.map((child) => (
                    <li key={`${child.title}-${child.slug}`}>
                      <Link
                        href={child.slug || "/"}
                        onClick={() => setSheetOpen(false)}
                        className="flex min-h-9 items-center rounded-md px-2 text-sm font-semibold transition-colors hover:bg-muted hover:text-red-800 dark:hover:text-red-400"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={item.slug || "/"}
                onClick={() => setSheetOpen(false)}
                className="inline-flex min-h-9 items-center rounded-md px-2 text-sm font-semibold transition-colors hover:bg-muted hover:text-red-800 dark:hover:text-red-400"
              >
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
