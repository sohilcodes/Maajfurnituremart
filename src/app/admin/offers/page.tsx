import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import DeleteOfferButton from "@/components/admin/delete-offer-button";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Offers</h1>
          <p className="text-gray-400 mt-1">{offers.length} total offers</p>
        </div>
        <Link
          href="/admin/offers/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-white text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Offer
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="glass rounded-xl overflow-hidden">
            {offer.image && (
              <div className="relative aspect-video bg-white/5">
                <Image src={offer.image} alt={offer.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-white">{offer.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    offer.isActive
                      ? "bg-green-600/20 text-green-400"
                      : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {offer.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {offer.discount && (
                <p className="text-secondary text-sm font-medium mb-3">
                  {offer.discount}
                </p>
              )}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/offers/${offer.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
                <DeleteOfferButton offerId={offer.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-16 text-gray-500 glass rounded-xl">
          Abhi koi offer nahi hai.
        </div>
      )}
    </div>
  );
}
