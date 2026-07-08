import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/products/product-grid";
import ProductFilters from "@/components/products/product-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of premium furniture — sofa, bed, dining, office aur bahut kuch.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}) {
  const params = await searchParams;
  const { category, sort, search } = params;

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const orderBy =
    sort === "price-low"
      ? { price: "asc" as const }
      : sort === "price-high"
      ? { price: "desc" as const }
      : { createdAt: "desc" as const };

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category: { slug: category } } : {}),
      ...(search
        ? { name: { contains: search, mode: "insensitive" as const } }
        : {}),
    },
    include: { category: true },
    orderBy,
  });

  return (
    <div className="container-custom pt-32 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Our <span className="text-gradient-gold">Products</span>
        </h1>
        <p className="text-gray-400 mt-3">
          {products.length} products mile{category ? ` "${category}" category mein` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <ProductFilters categories={categories} activeCategory={category} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
