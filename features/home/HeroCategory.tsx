import CategoryCard from "@/components/cards/categoryCard";
import { primaryLinks } from "@/constants/Links";

export function HeroCategory() {
  return (
    <section
      aria-label="Product Categories"
      className="w-full bg-white py-8 dark:bg-background sm:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="hidden flex-col gap-6 lg:flex">
          <div className="grid grid-cols-5 gap-6">
            {primaryLinks.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                y={index < 2 ? (index + 2) * 15 : index * 10}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:hidden">
          {primaryLinks.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              y={index < 2 ? (index + 1) * 15 : index * 10}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
