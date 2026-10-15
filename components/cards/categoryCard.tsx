import { NavigationItem } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

function CategoryCard({ category }: { category: NavigationItem }) {
  return (
    <Link
      href={category.slug ?? "/"}
      className="group flex w-full flex-col items-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted/30 shadow-xs transition-colors duration-300 group-hover:bg-muted/50 group-hover:shadow-md">
        <Image
          src={category.image ?? ""}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-105 sm:p-5"
        />
      </div>

      <h3 className="mt-2.5 text-center text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-red-800 dark:group-hover:text-red-400 sm:mt-3 sm:text-base">
        {category.title}
      </h3>
    </Link>
  );
}

export default CategoryCard;
