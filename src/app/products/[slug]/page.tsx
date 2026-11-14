import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductRail } from "@/components/product/product-rail";
import { StockStatus } from "@/components/product/stock-status";
import { SectionHeader } from "@/components/site/section-header";
import { Container, Heading, Section } from "@/components/ui";
import { formatPrice, getStockState } from "@/lib/catalog";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/lib/products";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image.src] },
  };
}

const availability = {
  in_stock: "https://schema.org/InStock",
  low_stock: "https://schema.org/LimitedAvailability",
  out_of_stock: "https://schema.org/OutOfStock",
} as const;

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const stock = getStockState(product);
  const soldOut = stock === "out_of_stock";
  const related = await getRelatedProducts(product.id, product.category.slug);
  const category = product.category.slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((i) => i.src),
    category: product.category.name,
    color: product.color,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: availability[stock],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Container className="pb-section pt-4 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
          <ol className="flex flex-wrap items-center gap-2 type-caption text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/collections/${category}`} className="transition-colors hover:text-ink">
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-10 xl:gap-x-20">
          <div className="md:col-span-7">
            <ProductGallery images={product.gallery} />
          </div>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:max-w-md">
              <Link
                href={`/collections/${category}`}
                className="type-caption text-muted transition-colors hover:text-ink"
              >
                {product.category.name}
              </Link>
              <Heading as="h1" size="display-sm" className="mt-3">
                {product.name}
              </Heading>
              <p className="mt-4 type-lead">{formatPrice(product.price, product.currency)}</p>

              <div className="mt-6 flex flex-col gap-2 border-t pt-6">
                <p className="type-body">
                  <span className="text-muted">Colour </span>
                  {product.color}
                </p>
                <StockStatus state={stock} quantity={product.stock} />
              </div>

              <div className="mt-8">
                <ProductPurchase
                  key={product.id}
                  productName={product.name}
                  sizes={product.sizes}
                  soldOut={soldOut}
                />
              </div>

              <ul className="mb-8 mt-2 flex flex-col gap-2 type-caption text-muted">
                <li>Complimentary shipping and returns</li>
                <li>Gift wrapping available</li>
              </ul>

              <ProductAccordion
                name="product-info"
                items={[
                  {
                    title: "Description",
                    defaultOpen: true,
                    content: <p>{product.description}</p>,
                  },
                  {
                    title: "Details & care",
                    content: (
                      <ul className="list-disc space-y-1 pl-4">
                        {product.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Shipping & returns",
                    content: (
                      <p>
                        Complimentary standard delivery in 2–4 business days. Returns are free within
                        30 days, collected from your door or in store.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section divided>
          <Container>
            <SectionHeader eyebrow="Discover" title="You may also like" />
          </Container>
          <div className="mx-auto max-w-(--container-page)">
            <ProductRail products={related} label="Related products" />
          </div>
        </Section>
      )}
    </>
  );
}
