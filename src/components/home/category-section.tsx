import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function CategorySection() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            Explore
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            Shop by <span className="text-gradient-gold">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-square rounded-xl overflow-hidden glass hover:scale-[1.03] transition-transform duration-300"
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-heading font-semibold text-sm md:text-base">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
