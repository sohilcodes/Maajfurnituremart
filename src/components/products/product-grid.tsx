import ProductCard from "./product-card";
import type { ProductType } from "@/types";

export default function ProductGrid({ products }: { products: ProductType[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Koi product nahi mila.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
