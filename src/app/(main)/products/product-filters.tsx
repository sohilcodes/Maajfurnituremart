"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { CategoryType } from "@/types";

export default function ProductFilters({
  categories,
  activeCategory,
}: {
  categories: CategoryType[];
  activeCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="space-y-8">
      <div>
        <label className="text-sm font-medium text-white mb-2 block">Search</label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Product khojein..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-white mb-3">Categories</p>
        <div className="space-y-1">
          <Link
            href="/products"
            className={cn(
              "block px-3 py-2 rounded-lg text-sm transition",
              !activeCategory
                ? "bg-primary/20 text-secondary"
                : "text-gray-400 hover:bg-white/5"
            )}
          >
            All Categories
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition",
                activeCategory === cat.slug
                  ? "bg-primary/20 text-secondary"
                  : "text-gray-400 hover:bg-white/5"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-white mb-2 block">Sort By</label>
        <select
          defaultValue={searchParams.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
        >
          <option value="">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
}
