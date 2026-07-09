"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createCategory, updateCategory } from "@/actions/categories";
import type { CategoryType } from "@/types";

export default function CategoryForm({ category }: { category?: CategoryType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(category?.image ? [category.image] : []);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    order: category?.order?.toString() || "0",
    isActive: category?.isActive ?? true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      image: images[0] || "",
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (category) {
          await updateCategory(category.id, payload);
          toast.success("Category update ho gayi");
        } else {
          await createCategory(payload);
          toast.success("Category create ho gayi");
        }
        router.push("/admin/categories");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Kuch galat ho gaya");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="glass rounded-xl p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Category Name
          </label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Display Order
          </label>
          <Input
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Category Image
          </label>
          <ImageUploader images={images} onChange={setImages} maxImages={1} />
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 accent-secondary"
          />
          Active (visible on site)
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/categories")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
      }
