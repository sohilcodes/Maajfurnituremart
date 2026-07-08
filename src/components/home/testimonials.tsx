import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-card/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            Customer <span className="text-gradient-gold">Reviews</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < t.rating
                        ? "fill-secondary text-secondary"
                        : "fill-gray-700 text-gray-700"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{t.message}"
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-secondary">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="font-medium text-white text-sm">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
