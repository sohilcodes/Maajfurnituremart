import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminProviders from "@/components/admin/providers";
import AdminSidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <AdminProviders>
      <div className="flex min-h-screen bg-background">
        {Boolean(session) && <AdminSidebar />}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </AdminProviders>
  );
}
