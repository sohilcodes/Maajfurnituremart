import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import DeleteProductButton from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 text-left text-xs text-gray-400 uppercase">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="text-sm">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      {product.images?.[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="text-white font-medium line-clamp-1">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-400">{product.category?.name}</td>
                <td className="px-5 py-4 text-white">
                  {formatPrice(product.discountPrice ?? product.price)}
                </td>
                <td className="px-5 py-4 text-gray-400">{product.stock}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.isActive
                        ? "bg-green-600/20 text-green-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            Abhi koi product nahi hai. "Add Product" pe click karke shuru karein.
          </div>
        )}
      </div>
    </div>
  );
      }
