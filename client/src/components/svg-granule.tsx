import { motion } from "framer-motion";

interface SvgGranuleProps {
  color: string;
  size: number;
  animationDelay: number;
}

export default function SvgGranule({ color, size, animationDelay }: SvgGranuleProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm" // Soft shadow for depth
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        delay: animationDelay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <path
        d="M12 2C16.5 2 20 5.5 21 10C21.5 12.5 20.5 15 19 17C17.5 19 15 21 12 21C8 21 4.5 18.5 3 15C1.5 11.5 2.5 7 5 4.5C7.5 2 9.5 2 12 2Z"
        fill={color}
      />
      
      {/* Highlight: White is still good for shine */}
      <path
        d="M8 6C10 4 13 4 15 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Shadow/Edge Definition: Darker stroke for Light Mode */}
      <path
        d="M12 2C16.5 2 20 5.5 21 10C21.5 12.5 20.5 15 19 17C17.5 19 15 21 12 21C8 21 4.5 18.5 3 15C1.5 11.5 2.5 7 5 4.5C7.5 2 9.5 2 12 2Z"
        stroke="black"
        strokeWidth="0.5"
        opacity="0.1" // Subtle outline
      />
    </motion.svg>
  );
}