import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Truck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MAAJ Furniture Mart ke baare mein jaanein — Ahmedabad ka trusted furniture showroom, quality aur customer satisfaction ke saath.",
};

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Sirf best material aur craftsmanship se bana furniture.",
  },
  {
    icon: Users,
    title: "500+ Happy Customers",
    desc: "Ahmedabad bhar mein hazaaron ghar sajaye hain humne.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Ahmedabad local area mein free delivery ki suvidha.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Showroom",
    desc: "Saalon ka experience aur trust ke saath quality guarantee.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-secondary text-sm font-medium tracking-widest uppercase">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-4">
            MAAJ <span className="text-gradient-gold">Furniture Mart</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Narol, Sarkhej Narol Highway pe sthit MAAJ Furniture Mart Ahmedabad
            ka ek trusted naam hai premium quality furniture ke liye. Hum
            manate hain ki har ghar deserve karta hai comfort aur style —
            isliye hum laate hain sofa, bed, dining, wardrobe aur office
            furniture ka best collection, affordable prices pe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value) => (
            <div key={value.title} className="glass rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                <value.icon size={24} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden glass">
            <Image
              src="/images/showroom-placeholder.jpg"
              alt="MAAJ Furniture Mart Showroom"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold mb-4">
              Hamari <span className="text-gradient-gold">Kahani</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Saalon pehle ek chhote se showroom se shuru hua safar aaj
              Ahmedabad ke sabse trusted furniture destinations mein se ek
              ban chuka hai. Hamara maqsad hamesha se raha hai — quality
              furniture, honest pricing, aur customer satisfaction.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Aaj hum offer karte hain 9+ categories mein wide range of
              furniture, har budget aur taste ke liye kuch na kuch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
      }
