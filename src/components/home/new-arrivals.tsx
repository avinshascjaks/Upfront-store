import { Container, Grid, Section } from "@/components/ui";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/site/section-header";
import { getNewArrivals } from "@/lib/products";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();
  return (
    <Section divided>
      <Container>
        <SectionHeader
          eyebrow="Just in"
          title="New arrivals"
          link={{ label: "View all", href: "/collections/new" }}
        />
        <Grid layout="products">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
