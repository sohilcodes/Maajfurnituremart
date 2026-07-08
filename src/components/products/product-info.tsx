import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount, getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { Package, Ruler, Layers, CheckCircle2, XCircle } from "lucide-react";
import type { ProductType } from "@/types";

export default function ProductInfo({ product }: { product: ProductType }) {
  const discount = calculateDiscount(product.price, product.discountPrice);
  const displayPrice = product.discountPrice ?? product.price;
  const inStock = product.stock > 0;

  return (
    <div>
      <p className="text-secondary text-sm uppercase tracking-widest mb-2">
        {product.category?.name}
      </p>
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
        {product.name}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-white">
          {formatPrice(displayPrice)}
        </span>
        {product.discountPrice && (
          <>
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
            <Badge variant="discount">{discount}% OFF</Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 mb-6">
        {inStock ? (
          <>
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="text-sm text-green-400">In Stock ({product.stock} available)</span>
          </>
        ) : (
          <>
            <XCircle size={18} className="text-red-400" />
            <span className="text-sm text-red-400">Out of Stock</span>
          </>
        )}
      </div>

      <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {product.material && (
          <div className="flex items-start gap-3 glass rounded-lg p-4">
            <Layers size={18} className="text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Material</p>
              <p className="text-sm text-white font-medium">{product.material}</p>
            </div>
          </div>
        )}
        {product.dimensions && (
          <div className="flex items-start gap-3 glass rounded-lg p-4">
            <Ruler size={18} className="text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Dimensions</p>
              <p className="text-sm text-white font-medium">{product.dimensions}</p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-3 glass rounded-lg p-4">
          <Package size={18} className="text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm text-white font-medium">{product.category?.name}</p>
          </div>
        </div>
      </div>

      <a
        href={getWhatsAppLink(product.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
      >
        <FaWhatsapp size={20} />
        Enquire on WhatsApp
      </a>
    </div>
  );
}
