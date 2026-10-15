"use client";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slide from "./slide";
import { images } from "@/constants/Links";

export function HeroSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const video = videoRef.current;
    if (!video) return;

    if (swiper.realIndex === 0) {
      video.muted = true;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
      <div className="group relative w-full overflow-hidden rounded-2xl bg-black">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          slidesPerView={1}
          speed={1000}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          watchSlidesProgress
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={handleSlideChange}
          onSlideChange={handleSlideChange}
          className="relative w-full overflow-hidden rounded-2xl"
        >
          <SwiperSlide>
            <div className="relative w-full aspect-21/9 overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="absolute inset-0 size-full object-cover"
                src="https://activ.eg/cdn/shop/videos/c/vp/ad0f0c05333c41039d74de3d7fa42703/ad0f0c05333c41039d74de3d7fa42703.HD-720p-1.6Mbps-95623360.mp4?v=0"
              >
                <source
                  src="https://activ.eg/cdn/shop/videos/c/vp/ad0f0c05333c41039d74de3d7fa42703/ad0f0c05333c41039d74de3d7fa42703.HD-720p-1.6Mbps-95623360.mp4?v=0"
                  type="video/mp4"
                />
              </video>
            </div>
          </SwiperSlide>

          {images.map((item) => (
            <>
              <SwiperSlide key={item.id}>
                <Slide key={item.id} src={item.src} href={item.href} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-11 items-center justify-center rounded-full bg-white text-black shadow-md sm:shadow-lg transition-all duration-300 ease-out hover:bg-black hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:opacity-0 md:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        >
          <ChevronLeft className="size-6 text-black hover:text-white cursor-pointer stroke-[2.25]" />
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-11 items-center justify-center rounded-full bg-white text-black shadow-md sm:shadow-lg transition-all duration-300 ease-out hover:bg-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:opacity-0 md:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        >
          <ChevronRight className="size-6 text-black hover:text-white cursor-pointer stroke-[2.25]" />
        </button>
      </div>
    </section>
  );
}
