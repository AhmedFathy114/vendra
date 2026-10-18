import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Home,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { primaryLinks } from "@/lib/Links";
import SubCategorySection from "./SubCategorySection";
import LoadingModel from "@/components/Loaders/LoadingModel";

function Category({ category }: { category: string }) {
  const group = primaryLinks.find((link) => link.slug === `/shop/${category}`);
  const subCategories = group?.children ?? [];

  if (!group) {
    return (
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
    );
  }

  return (
    <>
      <LoadingModel message={`Loading ${category}`} duration={1000} />
      <section className="w-full bg-background">
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li className="text-muted-foreground/70">Shop</li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="text-foreground">
                  {group.title}
                </li>
              </ol>
            </nav>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Shop by category
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {group.title}
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Explore our {group.title.toLowerCase()} collection. Pick a
                  subcategory to discover products curated for your everyday
                  style.
                </p>

                <p className="mt-4 text-sm font-medium text-foreground">
                  {subCategories.length}{" "}
                  {subCategories.length === 1 ? "subcategory" : "subcategories"}
                </p>
              </div>

              {group.image && (
                <div className="relative aspect-4/3 w-full max-w-sm shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:w-80">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 20rem, 100vw"
                    className="object-contain p-6"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
          {subCategories.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {subCategories.map((child) => (
                <li key={child.slug}>
                  <Link
                    href={child.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
                      {child.image ? (
                        <Image
                          src={child.image}
                          alt={child.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <LayoutGrid
                            className="size-8 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-3 border-t border-border p-3 sm:p-4">
                      <h2 className="text-sm font-semibold text-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-400 sm:text-base">
                        {child.title}
                      </h2>

                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white"
                      >
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
              <LayoutGrid
                className="size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-4 text-sm font-medium text-foreground">
                No subcategories yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back soon for new arrivals in this category.
              </p>
            </div>
          )}
        </div>

        {subCategories.length > 0 && (
          <div className="pb-6">
            {subCategories.map((child) => (
              <SubCategorySection key={child.slug} subCategory={child} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Category;
