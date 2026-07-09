import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BannerForm from "@/components/admin/banner-form";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banner = await prisma.banner.findUnique({ where: { id } });

  if (!banner) notFound();

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">Edit Banner</h1>
      <BannerForm banner={banner} />
    </div>
  );
}
