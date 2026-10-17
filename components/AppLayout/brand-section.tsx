import Link from "next/link";

export function BrandSection({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Vendra home"
      className={`inline-flex items-center ${className}`}
    >
      <span className="-skew-x-12 text-[1.7rem] font-black leading-none tracking-[-0.12em]">
        Vendra
      </span>
    </Link>
  );
}
