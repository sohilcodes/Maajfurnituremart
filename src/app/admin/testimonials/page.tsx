import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import DeleteTestimonialButton from "@/components/admin/delete-testimonial-button";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Testimonials</h1>
          <p className="text-gray-400 mt-1">{testimonials.length} total reviews</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < t.rating
                        ? "fill-secondary text-secondary"
                        : "fill-gray-700 text-gray-700"
                    }
                  />
                ))}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  t.isActive
                    ? "bg-green-600/20 text-green-400"
                    : "bg-gray-600/20 text-gray-400"
                }`}
              >
                {t.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{t.message}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/10 shrink-0">
                {t.image ? (
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-secondary">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-white">{t.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/testimonials/${t.id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition"
              >
                <Pencil size={14} />
                Edit
              </Link>
              <DeleteTestimonialButton id={t.id} />
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16 text-gray-500 glass rounded-xl">
          Abhi koi testimonial nahi hai.
        </div>
      )}
    </div>
  );
}
