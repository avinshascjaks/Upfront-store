import Image from "next/image";
import Link from "next/link";
import { Container, MediaFrame, Section } from "@/components/ui";
import { SectionHeader } from "@/components/site/section-header";
import { categories } from "@/lib/sample-data";

export function CategoryGrid() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Explore" title="Shop by category" align="center" />
        <ul className="grid grid-cols-2 gap-x-grid gap-y-8 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/collections/${cat.slug}`} className="group block">
                <MediaFrame ratio="portrait">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </MediaFrame>
                <p className="mt-4 text-center type-label decoration-1 underline-offset-4 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
