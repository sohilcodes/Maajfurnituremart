import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OfferForm from "@/components/admin/offer-form";

export const dynamic = "force-dynamic";

export default async function EditOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });

  if (!offer) notFound();

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">Edit Offer</h1>
      <OfferForm offer={offer} />
    </div>
  );
}
