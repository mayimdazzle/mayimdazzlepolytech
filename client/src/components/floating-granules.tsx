import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SvgGranule from "./svg-granule";

interface Granule {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const colors = [
  "#F59E0B", // amber
  "#FFFFFF", // white
  "#EF4444", // red
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // yellow
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#F97316", // orange
  "#06B6D4"  // teal
];

export default function FloatingGranules() {
  const [granules, setGranules] = useState<Granule[]>([]);

  useEffect(() => {
    const generateGranules = () => {
      const newGranules: Granule[] = [];
      for (let i = 0; i < 50; i++) {
        newGranules.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 3
        });
      }
      setGranules(newGranules);
    };

    generateGranules();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {granules.map((granule) => (
        <motion.div
          key={granule.id}
          className="absolute opacity-80"
          style={{
            left: `${granule.x}%`,
            top: `${granule.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: granule.delay,
            ease: "easeInOut"
          }}
        >
          <SvgGranule
            color={granule.color}
            size={granule.size}
            animationDelay={granule.delay}
          />
        </motion.div>
      ))}
    </div>
  );
}
