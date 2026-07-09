import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GalleryForm from "@/components/admin/gallery-form";

export const dynamic = "force-dynamic";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({ where: { id } });

  if (!image) notFound();

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">Edit Image</h1>
      <GalleryForm image={image} />
    </div>
  );
}
