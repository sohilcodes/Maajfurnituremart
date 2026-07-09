import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import DeleteBannerButton from "@/components/admin/delete-banner-button";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Banners</h1>
          <p className="text-gray-400 mt-1">{banners.length} total banners</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Banner
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="glass rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-white/5">
              <Image src={banner.image} alt={banner.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-white">
                  {banner.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    banner.isActive
                      ? "bg-green-600/20 text-green-400"
                      : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/banners/${banner.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
                <DeleteBannerButton bannerId={banner.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-16 text-gray-500 glass rounded-xl">
          Abhi koi banner nahi hai.
        </div>
      )}
    </div>
  );
}
