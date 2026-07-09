import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MAAJ Furniture Mart ki privacy policy padhein.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom pt-32 pb-20 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
        Privacy <span className="text-gradient-gold">Policy</span>
      </h1>

      <div className="space-y-6 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            1. Information We Collect
          </h2>
          <p>
            MAAJ Furniture Mart aapki contact information (naam, phone number,
            message) collect karta hai jab aap humein contact form ya WhatsApp
            ke through sampark karte hain. Ye information sirf aapki enquiry
            ka jawab dene ke liye use ki jaati hai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            2. How We Use Your Information
          </h2>
          <p>
            Aapki di gayi information ka use hum sirf aapko product details,
            pricing, aur availability ke baare mein contact karne ke liye
            karte hain. Hum aapki information kisi third party ko sell ya
            share nahi karte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            3. Data Security
          </h2>
          <p>
            Hum aapki personal information ko protect karne ke liye
            reasonable security measures follow karte hain. Lekin internet
            par kisi bhi transmission ki 100% security guarantee nahi di
            ja sakti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            4. Cookies
          </h2>
          <p>
            Hamari website basic functionality ke liye cookies use kar sakti
            hai. Aap apne browser settings se cookies disable kar sakte hain.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-white mb-3">
            5. Contact Us
          </h2>
          <p>
            Is privacy policy ke baare mein koi sawaal ho to humse contact
            karein: +91 8511882726 ya humari showroom address Narol, Sarkhej
            Narol Highway, Ahmedabad par visit karein.
          </p>
        </section>
      </div>
    </div>
  );
}
