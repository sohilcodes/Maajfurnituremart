import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "MAAJ Furniture Mart ki terms and conditions padhein.",
};

export default function TermsPage() {
  return (
    <div className="container-custom pt-32 pb-20 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
        Terms & <span className="text-gradient-gold">Conditions</span>
      </h1>

      <div className="space-y-6 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            1. General
          </h2>
          <p>
            Is website ka use karke, aap in terms and conditions se agree
            karte hain. MAAJ Furniture Mart kisi bhi samay in terms ko
            update karne ka adhikar rakhta hai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            2. Product Information
          </h2>
          <p>
            Hum apni poori koshish karte hain ki product images, prices, aur
            descriptions accurate hon. Lekin actual product mein color ya
            texture mein halka farq ho sakta hai screen display ki wajah se.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            3. Pricing
          </h2>
          <p>
            Website par diye gaye prices bina notice ke change ho sakte hain.
            Final price confirmation ke liye showroom visit karein ya
            WhatsApp/call se contact karein.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            4. Orders & Delivery
          </h2>
          <p>
            Order confirm karne ke baad delivery timeline showroom staff
            aapko bata denge. Delivery charges area ke hisaab se alag ho
            sakte hain.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            5. Returns & Exchange
          </h2>
          <p>
            Return aur exchange policy product ke type par depend karti hai.
            Kripya purchase se pehle showroom staff se return policy
            confirm kar lein.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            6. Contact
          </h2>
          <p>
            Kisi bhi sawaal ke liye humse contact karein: +91 8511882726,
            Narol, Sarkhej Narol Highway, Ahmedabad.
          </p>
        </section>
      </div>
    </div>
  );
}
