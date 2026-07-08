import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Sofa", href: "/categories/sofa" },
  { label: "Bed", href: "/categories/bed" },
  { label: "Dining", href: "/categories/dining" },
  { label: "Office", href: "/categories/office" },
  { label: "Wardrobe", href: "/categories/wardrobe" },
];

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  return (
    <footer className="bg-card border-t border-white/10 mt-20">
      <div className="container-custom py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-3">
            MAAJ Furniture Mart
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Premium quality furniture jo aapke ghar ko banaye luxurious aur
            comfortable. Ahmedabad ka trusted furniture showroom.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-600 transition"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-secondary transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="text-sm text-gray-400 hover:text-secondary transition"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
              Narol, Sarkhej Narol Highway, Ahmedabad
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-secondary shrink-0" />
              <a href={`tel:${phoneNumber}`} className="hover:text-secondary">
                {phoneNumber}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-secondary shrink-0" />
              info@maajfurniture.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MAAJ Furniture Mart. All rights reserved. Since 2010</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-secondary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
