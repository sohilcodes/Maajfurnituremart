"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const offerSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  discount: z.string().optional(),
  validTill: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
});

export async function createOffer(data: z.infer<typeof offerSchema>) {
  const validated = offerSchema.parse(data);
  const offer = await prisma.offer.create({
    data: {
      ...validated,
      validTill: validated.validTill ? new Date(validated.validTill) : null,
    },
  });
  revalidatePath("/admin/offers");
  revalidatePath("/offers");
  return offer;
}

export async function updateOffer(id: string, data: z.infer<typeof offerSchema>) {
  const validated = offerSchema.parse(data);
  const offer = await prisma.offer.update({
    where: { id },
    data: {
      ...validated,
      validTill: validated.validTill ? new Date(validated.validTill) : null,
    },
  });
  revalidatePath("/admin/offers");
  revalidatePath("/offers");
  return offer;
}

export async function deleteOffer(id: string) {
  await prisma.offer.delete({ where: { id } });
  revalidatePath("/admin/offers");
  revalidatePath("/offers");
}
