import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import DeleteCategoryButton from "@/components/admin/delete-category-button";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1">{categories.length} total categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="glass rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-white/5">
              {cat.image && (
                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-white">{cat.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    cat.isActive
                      ? "bg-green-600/20 text-green-400"
                      : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {cat.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {cat._count.products} products
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
                <DeleteCategoryButton categoryId={cat.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16 text-gray-500 glass rounded-xl">
          Abhi koi category nahi hai. "Add Category" pe click karke shuru karein.
        </div>
      )}
    </div>
  );
            }
