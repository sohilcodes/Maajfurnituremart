import ProductCard from "./product-card";
import type { ProductType } from "@/types";

export default function RelatedProducts({ products }: { products: ProductType[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
