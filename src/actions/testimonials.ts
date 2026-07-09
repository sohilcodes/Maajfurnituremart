"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
  rating: z.coerce.number().min(1).max(5).default(5),
  image: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
});

export async function createTestimonial(data: z.infer<typeof testimonialSchema>) {
  const validated = testimonialSchema.parse(data);
  const testimonial = await prisma.testimonial.create({ data: validated });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: z.infer<typeof testimonialSchema>
) {
  const validated = testimonialSchema.parse(data);
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: validated,
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
