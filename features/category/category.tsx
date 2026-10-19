import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { primaryLinks } from "@/lib/Links";
import SubCategorySection from "./SubCategorySection";
import LoadingModel from "@/components/Loaders/LoadingModel";
import CategoryInfo from "./CategoryInfo";
import NotFoundCategory from "./NotFoundCategory";

function Category({ category }: { category: string }) {
  const group = primaryLinks.find((link) => link.slug === `/shop/${category}`);
  const subCategories = group?.children ?? [];

  if (!group) {
    return <NotFoundCategory />;
  }

  return (
    <>
      <LoadingModel message={`Loading ${category}`} duration={1000} />
      <section className="w-full bg-background">
        <CategoryInfo length={subCategories.length} group={group} />

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
