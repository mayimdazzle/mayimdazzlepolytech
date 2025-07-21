import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FloatingGranules from "./floating-granules";
import { FlaskConical, Download, ChevronDown, Link } from "lucide-react";
import { generateCompanyBrochure } from "@/lib/pdf-generator"; // Adjust the import path as necessary

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
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
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-primary to-blue-600">
      <FloatingGranules />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                A Legacy of Innovation Since 2003
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Manufacturing Excellence in{" "}
              <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
                EPDM Rubber Granules
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              A Manufacturing Subsidiary of MayimDazzle India Private Limited
            </motion.p>

            <motion.p
              className="text-lg mb-10 opacity-80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Precision-engineered EPDM rubber granules with superior quality,
              unlimited color customization, and flexible sizing options
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={generateBrochure}
                  disabled={isGenerating}
                  size="lg"
                  className="bg-accent text-slate-900 hover:bg-amber-400 font-semibold px-8 py-3"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full mr-3"
                    />
                  ) : (
                    <Download className="mr-3" size={20} />
                  )}
                  {isGenerating ? 'Generating...' : 'Download Brochure'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

