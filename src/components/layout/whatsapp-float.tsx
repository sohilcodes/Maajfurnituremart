"use client";

import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "@/lib/utils";

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-fade-in"
      aria-label="WhatsApp par sampark karein"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
  );
}
