import Image from "next/image";
import Link from "next/link";

function Slide({ src, href }: { src: string; href: string }) {
  return (
    <>
      <Link href={href || "/"}>
        <div className="relative w-full aspect-21/9 overflow-hidden bg-black">
          <Image
            src={src}
            alt="Promotional banner 1 - Special Offer Sale"
            className="block size-full object-cover"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
            quality={80}
          />
        </div>
      </Link>
    </>
  );
}

export default Slide;
