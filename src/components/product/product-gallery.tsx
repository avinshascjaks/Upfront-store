import Image from "next/image";
import { MediaFrame } from "@/components/ui";
import type { Image as ImageType } from "@/lib/images";

/**
 * Mobile: full-bleed swipeable strip (next image peeks in).
 * md+: images stacked in a column beside the sticky info panel.
 */
export function ProductGallery({ images }: { images: ImageType[] }) {
  return (
    <ul
      aria-label="Product images"
      className="scrollbar-none -mx-gutter flex snap-x snap-mandatory gap-grid overflow-x-auto md:mx-0 md:grid md:overflow-visible"
    >
      {images.map((img, i) => (
        <li key={img.src} className="w-[88%] shrink-0 snap-start md:w-auto">
          <MediaFrame ratio="portrait">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 768px) 58vw, 88vw"
              className="object-cover"
            />
          </MediaFrame>
        </li>
      ))}
    </ul>
  );
}
