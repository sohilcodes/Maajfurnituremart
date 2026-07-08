import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ContactForm from "@/components/contact/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "MAAJ Furniture Mart se contact karein - Narol, Sarkhej Narol Highway, Ahmedabad. Call, WhatsApp, ya message bhejein.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-4">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-gray-400">
            Koi bhi sawaal ho furniture ke baare mein — humse turant contact karein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="glass rounded-xl p-8 mb-6">
              <h2 className="text-xl font-heading font-semibold mb-6">
                Message Bhejein
              </h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Address</p>
                <p className="text-gray-400 text-sm">
                  {settings?.address || "Narol, Sarkhej Narol Highway, Ahmedabad"}
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Call Us</p>
                <a
                  href={`tel:${settings?.phone}`}
                  className="text-gray-400 text-sm hover:text-secondary"
                >
                  {settings?.phone || "+91 8511882726"}
                </a>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <FaWhatsapp size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${settings?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-secondary"
                >
                  {settings?.whatsapp || "8511882726"}
                </a>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Timing</p>
                <p className="text-gray-400 text-sm">10:00 AM – 8:00 PM (All Days)</p>
              </div>
            </div>

            <div className="relative w-full h-64 rounded-xl overflow-hidden glass">
              <iframe
                src={
                  settings?.mapEmbedUrl ||
                  "https://www.google.com/maps?q=Narol,Sarkhej%20Narol%20Highway,Ahmedabad&output=embed"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
