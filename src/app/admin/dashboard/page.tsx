import { prisma } from "@/lib/prisma";
import StatCard from "@/components/admin/stat-card";
import { Package, FolderTree, MessageSquare, Eye, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    productCount,
    categoryCount,
    contactCount,
    totalViews,
    todayViews,
    weekViews,
    recentContacts,
    topPages,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 5,
    }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">MAAJ Furniture Mart admin overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Products" value={productCount} icon={Package} />
        <StatCard label="Categories" value={categoryCount} icon={FolderTree} />
        <StatCard
          label="Unread Enquiries"
          value={contactCount}
          icon={MessageSquare}
        />
        <StatCard label="Total Site Visits" value={totalViews} icon={Eye} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Visits" value={todayViews} icon={Users} />
        <StatCard label="Last 7 Days" value={weekViews} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h2 className="font-heading font-semibold text-lg text-white mb-5">
            Most Visited Pages
          </h2>
          {topPages.length === 0 ? (
            <p className="text-gray-500 text-sm">Abhi tak koi visit data nahi hai.</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <span className="text-sm text-gray-300 truncate">
                    {page.path === "/" ? "Homepage" : page.path}
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    {page._count.path} views
                  </span>
                </div>
              ))}
            </div>
          )}
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
                  className="flex items-start justify-between p-3 rounded-lg bg-white/5"
                >
                  <div>
                    <p className="font-medium text-white text-sm">{contact.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{contact.phone}</p>
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
    </div>
  );
}
