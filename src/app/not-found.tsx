import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-8xl md:text-9xl font-heading font-bold text-gradient-gold mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-heading text-white mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Ye page exist nahi karta ya move ho gaya hai. Wapas homepage pe jaake apni pasand ka furniture explore karein.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-gold text-white font-medium hover:opacity-90 transition"
      >
        <Home size={18} />
        Wapas Home Jaayein
      </Link>
    </div>
  );
}
