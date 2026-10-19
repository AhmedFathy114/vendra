// import { ChevronRight, Sparkles } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// function SubCategoryInfo() {
//   return (
//     <>
//       <div className="border-b border-border bg-muted/30">
//         <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
//           <nav aria-label="Breadcrumb" className="mb-6">
//             <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
//               <li>
//                 <Link
//                   href="/"
//                   className="transition-colors hover:text-foreground"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li aria-hidden="true">
//                 <ChevronRight className="size-3.5" />
//               </li>
//               <li className="text-muted-foreground/70">Shop</li>
//               <li aria-hidden="true">
//                 <ChevronRight className="size-3.5" />
//               </li>
//               <li aria-current="page" className="text-foreground">
//                 {group.title}
//               </li>
//             </ol>
//           </nav>

//           <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
//             <div className="max-w-2xl">
//               <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
//                 <Sparkles className="size-3.5" aria-hidden="true" />
//                 Shop by collection
//               </p>

//               <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
//                 {group.title}
//               </h1>

//               <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
//                 Explore our {group.title.toLowerCase()} collection. Pick a
//                 subcategory to discover products curated for your everyday
//                 style.
//               </p>
//             </div>

//             {group.image && (
//               <div className="relative aspect-4/3 w-full max-w-sm shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:w-80">
//                 <Image
//                   src={group.image}
//                   alt={group.title}
//                   fill
//                   priority
//                   sizes="(min-width: 1024px) 20rem, 100vw"
//                   className="object-contain p-6"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SubCategoryInfo;
