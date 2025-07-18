import { motion } from "framer-motion";

interface SvgGranuleProps {
  color: string;
  size: number;
  animationDelay?: number;
  className?: string;
}

export default function SvgGranule({ color, size, animationDelay = 0, className = "" }: SvgGranuleProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ scale: 1.2, rotate: 360 }}
    >
      <defs>
        <radialGradient id={`granule-gradient-${color}-${size}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </radialGradient>
        <filter id={`shadow-${color}-${size}`}>
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      <motion.circle
        cx="10"
        cy="10"
        r="8"
        fill={`url(#granule-gradient-${color}-${size})`}
        filter={`url(#shadow-${color}-${size})`}
        animate={{
          r: [8, 9, 8],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animationDelay
        }}
      />
      
      {/* Highlight */}
      <motion.circle
        cx="7"
        cy="7"
        r="2"
        fill="white"
        fillOpacity="0.3"
        animate={{
          r: [2, 2.5, 2],
          fillOpacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animationDelay + 0.5
        }}
      />
    </motion.svg>
  );
}