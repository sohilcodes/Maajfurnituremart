import { prisma } from "@/lib/prisma";
import EnquiryActions from "@/components/admin/enquiry-actions";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Enquiries</h1>
        <p className="text-gray-400 mt-1">{enquiries.length} total enquiries</p>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Abhi tak koi enquiry nahi aayi.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className={`p-5 flex items-start justify-between gap-4 ${
                  !enquiry.isRead ? "bg-secondary/5" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white">{enquiry.name}</p>
                    {!enquiry.isRead && (
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                    )}
                  </div>
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="text-sm text-secondary hover:underline"
                  >
                    {enquiry.phone}
                  </a>
                  <p className="text-gray-400 text-sm mt-2">{enquiry.message}</p>
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(enquiry.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <EnquiryActions id={enquiry.id} isRead={enquiry.isRead} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
