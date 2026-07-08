import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Gallery",
  description: "MAAJ Furniture Mart showroom aur products ki photos dekhein.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="container-custom pt-32 pb-20">
      <div className="text-center mb-14 max-w-xl mx-auto">
        <span className="text-secondary text-sm font-medium tracking-widest uppercase">
          Showroom
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
          Our <span className="text-gradient-gold">Gallery</span>
        </h1>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          Gallery jald hi update hogi.
        </p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full rounded-xl overflow-hidden break-inside-avoid glass group"
            >
              <Image
                src={img.image}
                alt={img.title || "Gallery"}
                width={500}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.title && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-sm font-medium">{img.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
