import { prisma } from "@/lib/prisma";
import StatCard from "@/components/admin/stat-card";
import { Package, FolderTree, MessageSquare, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, contactCount, galleryCount, recentContacts] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.galleryImage.count(),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">MAAJ Furniture Mart admin overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value={productCount} icon={Package} />
        <StatCard label="Categories" value={categoryCount} icon={FolderTree} />
        <StatCard
          label="Unread Enquiries"
          value={contactCount}
          icon={MessageSquare}
        />
        <StatCard label="Gallery Images" value={galleryCount} icon={ImageIcon} />
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-semibold text-lg text-white">
            Recent Enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-sm text-secondary hover:underline"
          >
            View All
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="text-gray-500 text-sm">Abhi tak koi enquiry nahi aayi.</p>
        ) : (
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-start justify-between p-4 rounded-lg bg-white/5"
              >
                <div>
                  <p className="font-medium text-white text-sm">{contact.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{contact.phone}</p>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-1">
                    {contact.message}
                  </p>
                </div>
                {!contact.isRead && (
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
            }
