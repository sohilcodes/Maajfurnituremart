"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  order: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
});

export async function createGalleryImage(data: z.infer<typeof gallerySchema>) {
  const validated = gallerySchema.parse(data);
  const image = await prisma.galleryImage.create({ data: validated });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return image;
}

export async function updateGalleryImage(
  id: string,
  data: z.infer<typeof gallerySchema>
) {
  const validated = gallerySchema.parse(data);
  const image = await prisma.galleryImage.update({ where: { id }, data: validated });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return image;
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}
