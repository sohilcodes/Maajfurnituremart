import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">
        Edit Testimonial
      </h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
