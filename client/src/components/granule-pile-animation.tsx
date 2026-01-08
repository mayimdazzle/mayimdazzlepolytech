import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SvgGranule from "./svg-granule";
import { cn } from "@/lib/utils";

interface GranulePileItem {
  id: number;
  offsetX: number; // Percentage offset from center horizontal
  offsetY: number; // Pixels from center vertical
  size: number;
  color: string;
  delay: number;
  layer: number;
}

const colors = [
  "#EF4444", "#3B82F6", "#10B981", "#F59E0B", 
  "#8B5CF6", "#EC4899", "#F97316", "#06B6D4"
];

interface GranulePileAnimationProps {
  className?: string;
}

export default function GranulePileAnimation({ className }: GranulePileAnimationProps) {
  const [granules, setGranules] = useState<GranulePileItem[]>([]);

  useEffect(() => {
    const generateGranulePile = () => {
      const newGranules: GranulePileItem[] = [];
      
      // Create a pile effect with multiple layers
      for (let layer = 0; layer < 6; layer++) {
        const granulesInLayer = 7 - layer; 
        
        for (let i = 0; i < granulesInLayer; i++) {
          // Spread granules horizontally around center
          const spread = (i - (granulesInLayer - 1) / 2) * (18 + layer * 4); 
          
          newGranules.push({
            id: layer * 10 + i,
            offsetX: spread, 
            // Position relative to vertical center (0)
            // Pile up from bottom (positive Y) to top (negative Y)
            offsetY: (layer * 20) - 40 + (Math.random() * 10),
            size: 24 + Math.random() * 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: layer * 0.15 + i * 0.1,
            layer
          });
        }
      }
      
      setGranules(newGranules);
    };

    generateGranulePile();
  }, []);

  return (
    <div className={cn(
      "relative w-full bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl overflow-hidden shadow-inner border border-white",
      "min-h-[400px]", // Default min-height safety
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
           <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Granule pile - Centered Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {granules.map((granule) => (
            <motion.div
              key={granule.id}
              className="absolute"
              style={{
                left: `calc(50% + ${granule.offsetX}%)`,
                top: `50%`, // Base at center
                marginTop: `${granule.offsetY}px`, // Adjust from center
                zIndex: 10 - granule.layer,
                x: "-50%",
                y: "-50%" 
              }}
              initial={{ opacity: 0, scale: 0, y: -150 }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              transition={{
                duration: 0.6,
                delay: granule.delay,
                type: "spring",
                damping: 12
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 4 + granule.layer,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: granule.delay
                }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                className="cursor-pointer drop-shadow-md"
              >
                <SvgGranule
                  color={granule.color}
                  size={granule.size}
                  animationDelay={0}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Title overlay */}
      <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm py-2 px-6 rounded-full inline-block shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h4 className="text-sm font-bold text-slate-900">Premium EPDM Granules</h4>
        </motion.div>
      </div>
    </div>
  );
}