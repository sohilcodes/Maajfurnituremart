"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import { markAsRead, deleteEnquiry } from "@/actions/enquiries";

export default function EnquiryActions({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleMarkRead() {
    startTransition(async () => {
      await markAsRead(id);
      toast.success("Read mark ho gaya");
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteEnquiry(id);
      toast.success("Enquiry delete ho gayi");
    });
  }

  return (
    <div className="flex items-center gap-2">
      {!isRead && (
        <button
          onClick={handleMarkRead}
          disabled={isPending}
          className="p-2 rounded-lg hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition"
          title="Mark as read"
        >
          <Check size={16} />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
