import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function calculateDiscount(price: number, discountPrice?: number | null): number {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function getWhatsAppLink(productName?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = productName
    ? `Hi, mujhe "${productName}" ke baare mein jaankari chahiye.`
    : "Hi, mujhe furniture ke baare mein jaankari chahiye.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
