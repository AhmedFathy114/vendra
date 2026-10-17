"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Mousewheel, Pagination } from "swiper/modules";
import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/pagination";

type ReusableSectionProps<T> = {
  title: string;
  data: T[];
  render: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
  viewAllHref?: string;
};

const arrowClass =
  "absolute top-[calc(50%-1.5rem)] z-20 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 ease-out hover:bg-black hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-95 md:flex";

export default function ReusableSection<T>({
  title,
  data,
  render,
  getKey,
  viewAllHref = "/products",
}: ReusableSectionProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  function syncEdges(swiper: SwiperType) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl capitalize">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="view-all-link shrink-0 text-sm font-semibold text-foreground sm:text-base"
        >
          <span>View All</span>
        </Link>
      </div>

      <div className="group/slider relative">
        <Swiper
          modules={[A11y, Mousewheel, Pagination]}
          className="reusable-swiper"
          grabCursor
          slidesPerView={1.9}
          spaceBetween={12}
          pagination={{ clickable: true }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncEdges(swiper);
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
          onBreakpoint={syncEdges}
          onUpdate={syncEdges}
        >
          {data.map((item) => (
            <SwiperSlide key={getKey(item)} className="h-auto">
              {render(item)}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          disabled={isBeginning}
          className={`${arrowClass} left-2 lg:left-3 ${
            isBeginning
              ? "pointer-events-none opacity-0"
              : "opacity-0 group-hover/slider:opacity-100"
          }`}
        >
          <ChevronLeft className="size-6 stroke-[2.25]" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          disabled={isEnd}
          className={`${arrowClass} right-2 lg:right-3 ${
            isEnd
              ? "pointer-events-none opacity-0"
              : "opacity-0 group-hover/slider:opacity-100"
          }`}
        >
          <ChevronRight className="size-6 stroke-[2.25]" aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
}
