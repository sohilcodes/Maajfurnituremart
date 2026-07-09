"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import type { TestimonialType } from "@/types";

export default function TestimonialForm({
  testimonial,
}: {
  testimonial?: TestimonialType;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(
    testimonial?.image ? [testimonial.image] : []
  );
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    message: testimonial?.message || "",
    rating: testimonial?.rating || 5,
    isActive: testimonial?.isActive ?? true,
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
      message: formData.message,
      rating: formData.rating,
      image: images[0] || "",
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (testimonial) {
          await updateTestimonial(testimonial.id, payload);
          toast.success("Testimonial update ho gaya");
        } else {
          await createTestimonial(payload);
          toast.success("Testimonial add ho gaya");
        }
        router.push("/admin/testimonials");
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
            Customer Name
          </label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Review Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              >
                <Star
                  size={28}
                  className={
                    star <= formData.rating
                      ? "fill-secondary text-secondary"
                      : "fill-gray-700 text-gray-700"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Customer Photo (optional)
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
          {isPending ? "Saving..." : testimonial ? "Update Testimonial" : "Add Testimonial"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/testimonials")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
