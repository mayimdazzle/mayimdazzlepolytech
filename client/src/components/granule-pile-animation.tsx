import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SvgGranule from "./svg-granule";
import { cn } from "@/lib/utils";

interface GranulePileItem {
  id: number;
  offsetX: number;
  offsetY: number;
  size: number;
  color: string;
  delay: number;
  layer: number;
}

// Corporate Palette Colors
const colors = [
  "#1e40af", // Dark Blue
  "#3b82f6", // Primary Blue
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#64748b", // Slate
  "#ef4444", // Red
];

interface GranulePileAnimationProps {
  className?: string;
}

export default function GranulePileAnimation({ className }: GranulePileAnimationProps) {
  const [granules, setGranules] = useState<GranulePileItem[]>([]);

  useEffect(() => {
    const generateGranulePile = () => {
      const newGranules: GranulePileItem[] = [];
      // Tighter packing for a "heap" look
      for (let layer = 0; layer < 6; layer++) {
        const granulesInLayer = 8 - layer; 
        for (let i = 0; i < granulesInLayer; i++) {
          const spread = (i - (granulesInLayer - 1) / 2) * (16 + layer * 2); 
          newGranules.push({
            id: layer * 10 + i,
            offsetX: spread, 
            offsetY: (layer * 18) - 30 + (Math.random() * 8),
            size: 20 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: layer * 0.1 + i * 0.05,
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
      "relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50",
      "min-h-[400px]",
      className
    )}>
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      {/* Center Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {granules.map((granule) => (
            <motion.div
              key={granule.id}
              className="absolute"
              style={{
                left: `calc(50% + ${granule.offsetX}%)`,
                top: `50%`,
                marginTop: `${granule.offsetY}px`,
                zIndex: 10 - granule.layer,
                x: "-50%",
                y: "-50%" 
              }}
              initial={{ opacity: 0, scale: 0, y: -200 }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              transition={{
                duration: 0.8,
                delay: granule.delay,
                type: "spring",
                damping: 15,
                stiffness: 100
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 90 }}
                className="cursor-pointer drop-shadow-sm transition-transform"
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

      {/* Corporate Badge Overlay */}
      <div className="absolute top-4 right-4">
         <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm">
            Premium Grade
         </div>
      </div>
    </div>
  );
}