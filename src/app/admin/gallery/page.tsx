import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DeleteGalleryButton from "@/components/admin/delete-gallery-button";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Gallery</h1>
          <p className="text-gray-400 mt-1">{images.length} total images</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Image
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="glass rounded-xl overflow-hidden group">
            <div className="relative aspect-square bg-white/5">
              <Image src={img.image} alt={img.title || "Gallery"} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Link
                  href={`/admin/gallery/${img.id}/edit`}
                  className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs backdrop-blur"
                >
                  Edit
                </Link>
                <DeleteGalleryButton imageId={img.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 text-gray-500 glass rounded-xl">
          Abhi koi image nahi hai.
        </div>
      )}
    </div>
  );
}
