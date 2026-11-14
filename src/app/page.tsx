import { CategoryGrid } from "@/components/home/category-grid";
import { CollectionTiles } from "@/components/home/collection-tiles";
import { EditorialFeature } from "@/components/home/editorial-feature";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ProductRail } from "@/components/product/product-rail";
import { Services } from "@/components/home/services";
import { SectionHeader } from "@/components/site/section-header";
import { Container, Section } from "@/components/ui";
import { getGiftEdit } from "@/lib/products";

export default async function Home() {
  const giftEdit = await getGiftEdit();
  return (
    <>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <EditorialFeature />
      <CollectionTiles />
      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="Gifts"
            title="The gift edit"
            link={{ label: "Shop all gifts", href: "/collections/gifts" }}
          />
        </Container>
        <div className="mx-auto max-w-(--container-page)">
          <ProductRail products={giftEdit} label="Gift ideas" />
        </div>
      </Section>
      <Services />
    </>
  );
}
