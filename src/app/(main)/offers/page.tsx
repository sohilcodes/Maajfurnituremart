import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Offers & Deals",
  description: "MAAJ Furniture Mart ke latest offers aur discounts dekhein.",
};

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-custom pt-32 pb-20">
      <div className="text-center mb-14 max-w-xl mx-auto">
        <span className="text-secondary text-sm font-medium tracking-widest uppercase">
          Deals
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
          Latest <span className="text-gradient-gold">Offers</span>
        </h1>
      </div>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          Abhi koi active offer nahi hai. Jald hi naye offers aayenge!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="glass rounded-xl overflow-hidden group hover:border-secondary/40 transition-all"
            >
              {offer.image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {offer.discount && (
                    <Badge variant="discount" className="absolute top-3 right-3">
                      {offer.discount}
                    </Badge>
                  )}
                </div>
              )}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-white mb-2">
                  {offer.title}
                </h3>
                {offer.description && (
                  <p className="text-gray-400 text-sm mb-3">{offer.description}</p>
                )}
                {offer.validTill && (
                  <div className="flex items-center gap-2 text-xs text-secondary">
                    <Calendar size={14} />
                    Valid till {new Date(offer.validTill).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
                  }
