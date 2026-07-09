"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
  siteName: z.string().min(2),
  address: z.string().min(2),
  phone: z.string().min(10),
  whatsapp: z.string().min(10),
  email: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
});

export async function updateSettings(data: z.infer<typeof settingsSchema>) {
  const validated = settingsSchema.parse(data);

  const settings = await prisma.siteSettings.upsert({
    where: { id: "1" },
    update: validated,
    create: { id: "1", ...validated },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/about");
  return settings;
}
