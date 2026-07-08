import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { isFeatured: true, isActive: true },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-secondary text-sm font-medium tracking-widest uppercase">
              Handpicked
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
              Featured <span className="text-gradient-gold">Products</span>
            </h2>
          </div>
          <Link href="/products">
            <Button variant="outline" className="group">
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
