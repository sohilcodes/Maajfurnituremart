import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminProviders from "@/components/admin/providers";
import AdminSidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AdminProviders>
      <AdminLayoutContent session={session}>{children}</AdminLayoutContent>
    </AdminProviders>
  );
}

function AdminLayoutContent({
  session,
  children,
}: {
  session: Awaited<ReturnType<typeof getServerSession>>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {session && <AdminSidebar />}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
