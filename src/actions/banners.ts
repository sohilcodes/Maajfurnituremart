"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const bannerSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  link: z.string().optional(),
  order: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
});

export async function createBanner(data: z.infer<typeof bannerSchema>) {
  const validated = bannerSchema.parse(data);
  const banner = await prisma.banner.create({ data: validated });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return banner;
}

export async function updateBanner(id: string, data: z.infer<typeof bannerSchema>) {
  const validated = bannerSchema.parse(data);
  const banner = await prisma.banner.update({ where: { id }, data: validated });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return banner;
}

export async function deleteBanner(id: string) {
  await prisma.banner.delete({ where: { id } });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
