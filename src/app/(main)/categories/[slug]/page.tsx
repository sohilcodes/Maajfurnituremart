import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGrid from "@/components/products/product-grid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Furniture`,
    description:
      category.description ||
      `Best quality ${category.name} collection at MAAJ Furniture Mart, Ahmedabad.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
  });

  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-custom pt-32 pb-20">
      <div className="mb-10 text-center">
        <span className="text-secondary text-sm font-medium tracking-widest uppercase">
          Category
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            {category.description}
          </p>
        )}
        <p className="text-gray-500 text-sm mt-2">
          {products.length} products available
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
