import { motion } from "framer-motion";

interface SvgLogoProps {
  size?: number;
  className?: string;
}

export default function SvgLogo({ size = 40, className = "" }: SvgLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: 360 }}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="logo-shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Factory building outline */}
      <motion.path
        d="M5 35 L5 25 L12 25 L12 20 L20 20 L20 15 L30 15 L30 20 L35 20 L35 35 Z"
        fill="url(#logo-gradient)"
        filter="url(#logo-shadow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Factory windows */}
      <motion.rect
        x="8" y="28" width="3" height="4"
        fill="white"
        fillOpacity="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.rect
        x="15" y="28" width="3" height="4"
        fill="white"
        fillOpacity="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.rect
        x="22" y="28" width="3" height="4"
        fill="white"
        fillOpacity="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      />
      <motion.rect
        x="29" y="28" width="3" height="4"
        fill="white"
        fillOpacity="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      />
      
      {/* Chimney */}
      <motion.rect
        x="32" y="10" width="4" height="10"
        fill="url(#logo-gradient)"
        filter="url(#logo-shadow)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      
      {/* Smoke particles */}
      <motion.circle
        cx="34" cy="8" r="1"
        fill="#9CA3AF"
        fillOpacity="0.7"
        animate={{
          cy: [8, 4, 8],
          opacity: [0.7, 0.3, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.circle
        cx="34" cy="6" r="0.8"
        fill="#9CA3AF"
        fillOpacity="0.5"
        animate={{
          cy: [6, 2, 6],
          opacity: [0.5, 0.2, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Gear/Manufacturing symbol */}
      <motion.circle
        cx="20" cy="25" r="3"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.8"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Granules around the logo */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={20 + Math.cos(i * Math.PI / 3) * 8}
          cy={20 + Math.sin(i * Math.PI / 3) * 8}
          r="1.5"
          fill={i % 2 === 0 ? "#F59E0B" : "#3B82F6"}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </motion.svg>
  );
}