"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/image-uploader";
import { createProduct, updateProduct } from "@/actions/products";
import type { CategoryType, ProductType } from "@/types";

export default function ProductForm({
  categories,
  product,
}: {
  categories: CategoryType[];
  product?: ProductType;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    discountPrice: product?.discountPrice?.toString() || "",
    material: product?.material || "",
    dimensions: product?.dimensions || "",
    stock: product?.stock?.toString() || "0",
    categoryId: product?.categoryId || categories[0]?.id || "",
    isFeatured: product?.isFeatured || false,
    isActive: product?.isActive ?? true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      material: formData.material,
      dimensions: formData.dimensions,
      stock: Number(formData.stock),
      categoryId: formData.categoryId,
      images,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    startTransition(async () => {
      try {
        if (product) {
          await updateProduct(product.id, payload);
          toast.success("Product update ho gaya");
        } else {
          await createProduct(payload);
          toast.success("Product create ho gaya");
        }
        router.push("/admin/products");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Kuch galat ho gaya, phir se try karein");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">
          Basic Information
        </h2>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Product Name
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
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">
          Pricing & Stock
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Price (₹)
            </label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Discount Price (₹)
            </label>
            <Input
              name="discountPrice"
              type="number"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Stock Quantity
          </label>
          <Input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-white">
          Specifications
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Material
            </label>
            <Input
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="e.g. Solid Wood"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Dimensions
            </label>
            <Input
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="e.g. 72x36x30 inches"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h2 className="font-heading font-semibold text-lg text-white mb-4">
          Product Images
        </h2>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      <div className="glass rounded-xl p-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 accent-secondary"
          />
          Featured Product
        </label>
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
          {isPending ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
