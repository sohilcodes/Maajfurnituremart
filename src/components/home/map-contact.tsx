import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Clock } from "lucide-react";

export default async function MapContact() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });

  return (
    <section className="py-20 bg-card/30">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-6">
            Find Our <span className="text-gradient-gold">Showroom</span>
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Address</p>
                <p className="text-gray-400 text-sm">
                  {settings?.address || "Narol, Sarkhej Narol Highway"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Phone</p>
                <a
                  href={`tel:${settings?.phone}`}
                  className="text-gray-400 text-sm hover:text-secondary"
                >
                  {settings?.phone || "+91 8511882726"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <Clock size={18} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Showroom Timing</p>
                <p className="text-gray-400 text-sm">10:00 AM – 8:00 PM (All Days)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden glass">
          <iframe
            src={
              settings?.mapEmbedUrl ||
              "https://www.google.com/maps?q=Narol,Sarkhej%20Narol%20Highway,Ahmedabad&output=embed"
            }
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Showroom Location"
          />
        </div>
      </div>
    </section>
  );
}
