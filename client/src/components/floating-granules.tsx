import { motion } from "framer-motion";
import SvgGranule from "./svg-granule";

// Subtle corporate colors for light background
const granules = [
  { id: 1, x: 10, y: 20, size: 40, color: "#e2e8f0", duration: 25 }, // Slate 200
  { id: 2, x: 85, y: 15, size: 30, color: "#dbeafe", duration: 30 }, // Blue 100
  { id: 3, x: 70, y: 60, size: 50, color: "#f1f5f9", duration: 35 }, // Slate 100
  { id: 4, x: 20, y: 80, size: 35, color: "#e0f2fe", duration: 28 }, // Sky 100
  { id: 5, x: 50, y: 40, size: 25, color: "#fef3c7", duration: 32 }, // Amber 100
  { id: 6, x: 90, y: 85, size: 45, color: "#f3f4f6", duration: 40 }, // Gray 100
];

export default function FloatingGranules() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {granules.map((granule) => (
        <motion.div
          key={granule.id}
          className="absolute opacity-60"
          style={{
            left: `${granule.x}%`,
            top: `${granule.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: granule.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <SvgGranule 
            color={granule.color} 
            size={granule.size} 
            animationDelay={0}
          />
        </motion.div>
      ))}
    </div>
  );
}