"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  order: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
});

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const validated = categorySchema.parse(data);
  const slug = slugify(validated.name);

  const category = await prisma.category.create({
    data: { ...validated, slug },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
  return category;
}

export async function updateCategory(
  id: string,
  data: z.infer<typeof categorySchema>
) {
  const validated = categorySchema.parse(data);

  const category = await prisma.category.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
  return category;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}
