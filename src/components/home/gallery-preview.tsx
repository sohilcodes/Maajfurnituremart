import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function GalleryPreview() {
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  if (images.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            Showroom
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            Our <span className="text-gradient-gold">Gallery</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={img.image}
                alt={img.title || "Gallery image"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button variant="outline" className="group">
              View Full Gallery
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
