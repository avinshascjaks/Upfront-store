import Image from "next/image";
import Link from "next/link";
import { MediaFrame } from "@/components/ui";
import { formatPrice, getStockState, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  className?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  className,
}: ProductCardProps) {
  const soldOut = getStockState(product) === "out_of_stock";
  const tag = soldOut ? "Sold out" : product.badge;

  return (
    <Link href={`/products/${product.slug}`} className={cn("group block", className)}>
      <MediaFrame ratio="portrait">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.03]",
            soldOut && "opacity-70",
          )}
        />
        {tag && (
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 type-caption">{tag}</span>
        )}
      </MediaFrame>
      <div className="mt-3 flex flex-col gap-1 pr-2 md:mt-4">
        <p className="type-caption text-muted">{product.category.name}</p>
        <h3 className="type-body decoration-1 underline-offset-4 group-hover:underline">
          {product.name}
        </h3>
        <p className="type-body text-muted">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
