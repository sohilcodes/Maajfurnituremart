"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/categories";

export default function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
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
        await deleteCategory(categoryId);
        toast.success("Category delete ho gayi");
      } catch {
        toast.error("Delete karne mein error aaya (products linked ho sakte hain)");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
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
