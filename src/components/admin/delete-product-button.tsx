"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/products";

export default function DeleteProductButton({ productId }: { productId: string }) {
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
        await deleteProduct(productId);
        toast.success("Product delete ho gaya");
      } catch {
        toast.error("Delete karne mein error aaya");
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
      title={confirming ? "Phir se click karke confirm karein" : "Delete"}
    >
      <Trash2 size={16} />
    </button>
  );
}
