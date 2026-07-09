"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createOffer, updateOffer } from "@/actions/offers";
import type { OfferType } from "@/types";

export default function OfferForm({ offer }: { offer?: OfferType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(offer?.image ? [offer.image] : []);
  const [formData, setFormData] = useState({
    title: offer?.title || "",
    description: offer?.description || "",
    discount: offer?.discount || "",
    validTill: offer?.validTill
      ? new Date(offer.validTill).toISOString().split("T")[0]
      : "",
    isActive: offer?.isActive ?? true,
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
      title: formData.title,
      description: formData.description,
      image: images[0] || "",
      discount: formData.discount,
      validTill: formData.validTill,
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (offer) {
          await updateOffer(offer.id, payload);
          toast.success("Offer update ho gaya");
        } else {
          await createOffer(payload);
          toast.success("Offer create ho gaya");
        }
        router.push("/admin/offers");
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Discount (e.g. 20% OFF)
            </label>
            <Input
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="20% OFF"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Valid Till
            </label>
            <Input
              name="validTill"
              type="date"
              value={formData.validTill}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Offer Image
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
          {isPending ? "Saving..." : offer ? "Update Offer" : "Create Offer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/offers")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
          }
