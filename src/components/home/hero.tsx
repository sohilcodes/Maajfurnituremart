"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <Sparkles size={16} className="text-secondary" />
          <span className="text-sm text-gray-300">
            Ahmedabad ka Trusted Furniture Showroom
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight mb-6"
        >
          Luxury Furniture
          <br />
          <span className="text-gradient-gold">Redefined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Premium quality sofa, bed, dining aur office furniture — jo har ghar
          ko banaye khubsurat aur comfortable. Best price guarantee ke saath.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/products">
            <Button size="lg" className="group">
              Explore Collection
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Visit Showroom
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-10 border-t border-white/10"
        >
          <div>
            <p className="text-3xl font-heading font-bold text-gradient-gold">500+</p>
            <p className="text-xs text-gray-500 mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-gradient-gold">9+</p>
            <p className="text-xs text-gray-500 mt-1">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-gradient-gold">5★</p>
            <p className="text-xs text-gray-500 mt-1">Rated Showroom</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
