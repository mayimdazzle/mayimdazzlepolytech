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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ rotate: 5 }}
    >
      {/* Outer Hexagon - Accent Color (Amber) */}
      <path
        d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z"
        stroke="#F59E0B"
        strokeWidth="4"
        className="drop-shadow-sm"
      />
      
      {/* Inner M Shape - Main Brand Color (Corporate Blue or Slate) */}
      <motion.path
        d="M30 40V70H40V55L50 65L60 55V70H70V40L50 60L30 40Z"
        fill="#1e293b" // Slate-800 for high contrast on white
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Floating Dot - Primary Blue */}
      <motion.circle
        cx="50"
        cy="25"
        r="5"
        fill="#3B82F6"
        animate={{ y: [0, -4, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}