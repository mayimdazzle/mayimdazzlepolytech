import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AnimatedHero() {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay - Using your 'court.jpg' as a placeholder for a hero shot */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/court.jpg" 
          alt="Sports Surface" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-accent/90 text-slate-900 font-bold px-4 py-1.5 rounded-full text-sm mb-6">
              Global Leader in EPDM Solutions
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Performance <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
              Beneath Your Feet.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Engineered rubber granules for world-class sports tracks, playgrounds, and industrial safety surfaces. Innovation from Mayim Dazzle Polytech.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-primary hover:bg-blue-600 text-white font-semibold px-8 h-12 rounded-full text-base">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-12 rounded-full px-8 text-base bg-transparent">
              Contact Sales <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}