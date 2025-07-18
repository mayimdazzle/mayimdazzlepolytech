import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SvgGranule from "./svg-granule";

interface GranulePileItem {
  id: number;
  x: number;
  y: number;
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
      
      // Create a pile effect with multiple layers
      for (let layer = 0; layer < 5; layer++) {
        const granulesInLayer = 8 - layer;
        const layerWidth = 200 + layer * 40;
        
        for (let i = 0; i < granulesInLayer; i++) {
          const angle = (i / granulesInLayer) * Math.PI * 2;
          const radius = 30 + layer * 25;
          
          newGranules.push({
            id: layer * 10 + i,
            x: Math.cos(angle) * radius + layerWidth / 2,
            y: Math.sin(angle) * radius + 150 - layer * 15,
            size: 20 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: layer * 0.2 + i * 0.1,
            layer
          });
        }
      }
      
      setGranules(newGranules);
    };

    generateGranulePile();
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Granule pile */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {granules.map((granule) => (
            <motion.div
              key={granule.id}
              className="absolute"
              style={{
                left: `${granule.x}px`,
                top: `${granule.y}px`,
                zIndex: 5 - granule.layer,
              }}
              initial={{ opacity: 0, scale: 0, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: granule.delay,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3 + granule.layer * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: granule.delay + 1
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="cursor-pointer"
              >
                <SvgGranule
                  color={granule.color}
                  size={granule.size}
                  animationDelay={granule.delay}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-40"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
      
      {/* Title overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <motion.h4 
          className="text-lg font-bold text-slate-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          Premium EPDM Granules
        </motion.h4>
        <motion.p 
          className="text-sm text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          Multiple colors and sizes available for your specific needs
        </motion.p>
      </div>
    </div>
  );
}