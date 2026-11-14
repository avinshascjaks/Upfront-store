import Image from "next/image";
import Link from "next/link";
import { Container, Grid, MediaFrame, Section } from "@/components/ui";
import { SectionHeader } from "@/components/site/section-header";
import { featuredCollections } from "@/lib/sample-data";

export function CollectionTiles() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Featured" title="The collections" />
        <Grid layout="editorial">
          {featuredCollections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group block">
              <MediaFrame ratio="editorial">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent via-60% to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-10">
                  <p className="type-caption">{c.eyebrow}</p>
                  <h3 className="mt-3 text-display-sm">{c.title}</h3>
                  <p className="mt-3 max-w-sm type-body text-paper/85">{c.description}</p>
                  <span className="mt-6 inline-block type-label underline decoration-1 underline-offset-[0.35em] transition-colors group-hover:decoration-transparent">
                    Explore
                  </span>
                </div>
              </MediaFrame>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
