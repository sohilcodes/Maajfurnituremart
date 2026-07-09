"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteGenericButton({
  onDelete,
  confirmMessage = "Confirm karne ke liye phir se click karein",
}: {
  onDelete: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    startTransition(async () => {
      try {
        await onDelete();
        toast.success("Delete ho gaya");
      } catch {
        toast.error("Delete karne mein error aaya");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title={confirming ? confirmMessage : "Delete"}
      className={`p-2 rounded-lg transition ${
        confirming
          ? "bg-red-600 text-white"
          : "hover:bg-red-500/10 text-gray-400 hover:text-red-400"
      }`}
    >
      <Trash2 size={16} />
    </button>
  );
}
