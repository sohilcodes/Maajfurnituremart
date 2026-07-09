import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">
        Add New Product
      </h1>
      <ProductForm categories={categories} />
    </div>
  );
}
