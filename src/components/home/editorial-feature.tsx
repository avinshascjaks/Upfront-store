import Image from "next/image";
import { ButtonLink, Heading, MediaFrame, Text } from "@/components/ui";
import { editorial } from "@/lib/sample-data";

/** Full-bleed image beside a quiet text panel. */
export function EditorialFeature() {
  return (
    <section className="grid md:grid-cols-2">
      <MediaFrame ratio="editorial" className="md:aspect-auto md:min-h-[44rem]">
        <Image
          src={editorial.image.src}
          alt={editorial.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </MediaFrame>
      <div className="flex items-center bg-surface px-gutter py-section md:px-12 xl:px-24">
        <div className="max-w-md">
          <Text variant="caption">{editorial.eyebrow}</Text>
          <Heading className="mt-4">{editorial.title}</Heading>
          <Text variant="muted" className="mt-6">
            {editorial.description}
          </Text>
          <ButtonLink href={editorial.cta.href} variant="secondary" className="mt-10">
            {editorial.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
