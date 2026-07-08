"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-lg" : "bg-transparent"
      )}
    >
      <nav className="container-custom flex items-center justify-between h-20">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-2xl font-heading font-bold text-gradient-gold">
            MAAJ
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">
            Furniture Mart
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                pathname === link.href ? "text-secondary" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
            <Button variant="outline" size="sm">
              <Phone size={16} />
              Call Now
            </Button>
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-fade-in">
          <div className="flex flex-col p-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === link.href ? "text-secondary" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
              <Button className="w-full mt-2">
                <Phone size={16} />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
          }
