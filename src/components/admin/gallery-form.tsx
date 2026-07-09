"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createGalleryImage, updateGalleryImage } from "@/actions/gallery";
import type { GalleryImageType } from "@/types";

export default function GalleryForm({ image }: { image?: GalleryImageType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(image?.image ? [image.image] : []);
  const [formData, setFormData] = useState({
    title: image?.title || "",
    order: image?.order?.toString() || "0",
    isActive: image?.isActive ?? true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!images[0]) {
      toast.error("Image required hai");
      return;
    }

    const payload = {
      title: formData.title,
      image: images[0],
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (image) {
          await updateGalleryImage(image.id, payload);
          toast.success("Gallery image update ho gayi");
        } else {
          await createGalleryImage(payload);
          toast.success("Gallery image add ho gayi");
        }
        router.push("/admin/gallery");
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
            Title (optional)
          </label>
          <Input name="title" value={formData.title} onChange={handleChange} />
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
          <label className="text-sm font-medium text-white mb-2 block">Image</label>
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
          Active
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : image ? "Update Image" : "Add Image"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/gallery")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
