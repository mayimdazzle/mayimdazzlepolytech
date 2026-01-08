import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FloatingGranules from "./floating-granules";
import { Download, ChevronDown } from "lucide-react";
import { generateCompanyBrochure } from "@/lib/pdf-generator";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.95 }
};

export default function AnimatedHero() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBrochure = async () => {
    setIsGenerating(true);
    try {
      await generateCompanyBrochure();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary to-blue-700 pt-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <FloatingGranules />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-1.5 text-sm">
                A Legacy of Innovation Since 2003
              </Badge>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Manufacturing Excellence in{" "}
              <span className="block mt-2 sm:inline text-accent bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
                EPDM Rubber Granules
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl mb-8 text-blue-100 font-medium max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A Manufacturing Subsidiary of MayimDazzle India Private Limited
            </motion.p>

            <motion.p
              className="text-base md:text-lg mb-10 text-blue-100/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Precision-engineered for sports flooring and safety surfaces. 
              Superior quality with unlimited color customization.
            </motion.p>

            <motion.div
              className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={generateBrochure}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-slate-900 hover:bg-amber-400 font-bold text-base px-8 py-6 shadow-lg shadow-black/10"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-3" />
                        Generating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                        <Download className="mr-2" size={20} />
                        Download Brochure
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}