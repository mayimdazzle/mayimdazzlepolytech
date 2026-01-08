import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SvgGranule from "./svg-granule";

interface GranulePileItem {
  id: number;
  offsetX: number; // Percentage offset from center
  offsetY: number; // Pixels from top
  size: number;
  color: string;
  delay: number;
  layer: number;
}

const colors = [
  "#EF4444", "#3B82F6", "#10B981", "#F59E0B", 
  "#8B5CF6", "#EC4899", "#F97316", "#06B6D4"
];

export default function GranulePileAnimation() {
  const [granules, setGranules] = useState<GranulePileItem[]>([]);

  useEffect(() => {
    const generateGranulePile = () => {
      const newGranules: GranulePileItem[] = [];
      const baseVerticalPos = 180; // Center vertical
      
      // Create a pile effect with multiple layers
      for (let layer = 0; layer < 5; layer++) {
        const granulesInLayer = 6 - layer; // Fewer granules
        
        for (let i = 0; i < granulesInLayer; i++) {
          // Calculate distribution: spread granules around center
          // Normalized range from -1 to 1
          const spread = (i - (granulesInLayer - 1) / 2) * (15 + layer * 5); 
          
          newGranules.push({
            id: layer * 10 + i,
            offsetX: spread, // Percentage offset
            offsetY: baseVerticalPos - layer * 25 + Math.random() * 10,
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
    <div className="relative w-full h-[350px] md:h-[400px] bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl overflow-hidden shadow-inner border border-white">
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
      
      {/* Granule pile */}
      <div className="absolute inset-0">
        {granules.map((granule) => (
          <motion.div
            key={granule.id}
            className="absolute"
            style={{
              left: `calc(50% + ${granule.offsetX}%)`, // Responsive centering
              top: `${granule.offsetY}px`,
              zIndex: 10 - granule.layer,
              x: "-50%" // Center the element itself
            }}
            initial={{ opacity: 0, scale: 0, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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
      
      {/* Title overlay */}
      <div className="absolute bottom-6 left-0 right-0 text-center px-4">
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