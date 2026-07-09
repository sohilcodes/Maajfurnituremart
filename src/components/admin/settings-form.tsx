"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import type { SiteSettingsType } from "@/types";

export default function SettingsForm({ settings }: { settings: SiteSettingsType | null }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    siteName: settings?.siteName || "MAAJ Furniture Mart",
    address: settings?.address || "Narol, Sarkhej Narol Highway",
    phone: settings?.phone || "+918511882726",
    whatsapp: settings?.whatsapp || "918511882726",
    email: settings?.email || "",
    metaTitle: settings?.metaTitle || "",
    metaDescription: settings?.metaDescription || "",
    facebookUrl: settings?.facebookUrl || "",
    instagramUrl: settings?.instagramUrl || "",
    mapEmbedUrl: settings?.mapEmbedUrl || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateSettings(formData);
        toast.success("Settings update ho gayi");
      } catch (error) {
        console.error(error);
        toast.error("Kuch galat ho gaya");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">
          General Information
        </h2>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">Site Name</label>
          <Input name="siteName" value={formData.siteName} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">Address</label>
          <Input name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">Phone</label>
            <Input name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              WhatsApp Number
            </label>
            <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} required />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Email (optional)
          </label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">SEO Settings</h2>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Meta Title
          </label>
          <Input name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
          />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">
          Social & Map
        </h2>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Facebook URL
          </label>
          <Input
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
            placeholder="https://facebook.com/..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Instagram URL
          </label>
          <Input
            name="instagramUrl"
            value={formData.instagramUrl}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Google Maps Embed URL
          </label>
          <Input
            name="mapEmbedUrl"
            value={formData.mapEmbedUrl}
            onChange={handleChange}
            placeholder="https://www.google.com/maps?...&output=embed"
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
