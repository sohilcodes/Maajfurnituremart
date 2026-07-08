import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount, getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import type { ProductType } from "@/types";

export default function ProductCard({ product }: { product: ProductType }) {
  const discount = calculateDiscount(product.price, product.discountPrice);
  const displayPrice = product.discountPrice ?? product.price;

  return (
    <div className="group relative rounded-xl overflow-hidden glass hover:border-secondary/40 transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-white/5">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
              No Image
            </div>
          )}

          {discount > 0 && (
            <Badge variant="discount" className="absolute top-3 left-3">
              {discount}% OFF
            </Badge>
          )}

          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-secondary uppercase tracking-wide mb-1">
            {product.category?.name}
          </p>
          <h3 className="font-heading font-semibold text-white text-base mb-2 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(displayPrice)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href={getWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-green-600/10 border border-green-600/30 text-green-400 text-sm font-medium hover:bg-green-600/20 transition"
        >
          <FaWhatsapp size={16} />
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
