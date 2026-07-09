"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({
  images,
  onChange,
  maxImages = 6,
}: {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        uploadedUrls.push(data.url);
      }

      onChange([...images, ...uploadedUrls]);
      toast.success("Images upload ho gayi");
    } catch (error) {
      console.error(error);
      toast.error("Upload mein error aaya");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden glass group"
          >
            <Image src={img} alt={`Image ${index + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-square rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-secondary/50 transition text-gray-500 hover:text-secondary"
          >
            {isUploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <Upload size={20} />
                <span className="text-xs">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
