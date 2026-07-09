"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createBanner, updateBanner } from "@/actions/banners";
import type { BannerType } from "@/types";

export default function BannerForm({ banner }: { banner?: BannerType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(banner?.image ? [banner.image] : []);
  const [formData, setFormData] = useState({
    title: banner?.title || "",
    subtitle: banner?.subtitle || "",
    link: banner?.link || "",
    order: banner?.order?.toString() || "0",
    isActive: banner?.isActive ?? true,
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
      toast.error("Banner image required hai");
      return;
    }

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      image: images[0],
      link: formData.link,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (banner) {
          await updateBanner(banner.id, payload);
          toast.success("Banner update ho gaya");
        } else {
          await createBanner(payload);
          toast.success("Banner create ho gaya");
        }
        router.push("/admin/banners");
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
          <label className="text-sm font-medium text-white mb-2 block">Title</label>
          <Input name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">Subtitle</label>
          <Input name="subtitle" value={formData.subtitle} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Link (optional)
          </label>
          <Input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="/products"
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
            Banner Image
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
          Active
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : banner ? "Update Banner" : "Create Banner"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/banners")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
      }
