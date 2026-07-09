import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
