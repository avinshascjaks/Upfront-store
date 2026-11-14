import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { hero } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

/** Full-viewport split campaign: one image on mobile, two side by side from md. */
export function Hero() {
  return (
    <section className="relative isolate h-[calc(100svh-var(--header-h)-2rem)] min-h-[34rem] md:max-h-[64rem]">
      <div className="absolute inset-0 -z-10 grid md:grid-cols-2">
        {hero.images.map((img, i) => (
          <div key={img.src} className={cn("relative bg-surface", i > 0 && "hidden md:block")}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/25 via-45% to-transparent" />
      </div>

      <div className="container-page flex h-full flex-col items-center justify-end pb-12 text-center text-paper md:pb-20">
        <div className="flex flex-col items-center [text-shadow:0_1px_16px_rgb(0_0_0/0.45)]">
          <p className="type-caption">{hero.eyebrow}</p>
          <h1 className="mt-4 text-display-lg">{hero.title}</h1>
          <p className="mt-5 max-w-md type-lead">{hero.description}</p>
        </div>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={hero.cta.href} variant="inverse">
            {hero.cta.label}
          </ButtonLink>
          <ButtonLink
            href={hero.secondaryCta.href}
            variant="secondary"
            className="border-paper text-paper hover:bg-paper hover:text-ink"
          >
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
