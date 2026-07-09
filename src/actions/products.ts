"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.coerce.number().positive(),
  discountPrice: z.coerce.number().optional().nullable(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  images: z.array(z.string()).default([]),
  isFeatured: z.coerce.boolean().default(false),
  isActive: z.coerce.boolean().default(true),
});

export async function createProduct(data: z.infer<typeof productSchema>) {
  const validated = productSchema.parse(data);
  const slug = slugify(validated.name);

  const existing = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const product = await prisma.product.create({
    data: { ...validated, slug: finalSlug },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return product;
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof productSchema>
) {
  const validated = productSchema.parse(data);

  const product = await prisma.product.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductStatus(id: string, isActive: boolean) {
  await prisma.product.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
