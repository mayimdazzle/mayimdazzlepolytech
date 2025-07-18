import { motion } from "framer-motion";
import { useState } from "react";
import SvgGranule from "./svg-granule";

const granulesData = [
  { id: 1, color: "#EF4444", size: 20, name: "Red Granules" },
  { id: 2, color: "#3B82F6", size: 24, name: "Blue Granules" },
  { id: 3, color: "#10B981", size: 18, name: "Green Granules" },
  { id: 4, color: "#F59E0B", size: 22, name: "Amber Granules" },
  { id: 5, color: "#8B5CF6", size: 20, name: "Purple Granules" },
  { id: 6, color: "#EC4899", size: 26, name: "Pink Granules" },
  { id: 7, color: "#F97316", size: 19, name: "Orange Granules" },
  { id: 8, color: "#06B6D4", size: 23, name: "Cyan Granules" },
];

export default function InteractiveGranuleShowcase() {
  const [selectedGranule, setSelectedGranule] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Granule Display</h3>
        <p className="text-slate-600">Hover over granules to see them in action</p>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        {granulesData.map((granule, index) => (
          <motion.div
            key={granule.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setSelectedGranule(granule.id)}
            onHoverEnd={() => setSelectedGranule(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-2">
              <SvgGranule
                color={granule.color}
                size={granule.size}
                animationDelay={index * 0.1}
              />
            </div>
            <span className="text-xs text-slate-600 font-medium">{granule.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Animated showcase area */}
      <div className="relative h-40 bg-white rounded-lg border-2 border-dashed border-slate-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {selectedGranule ? (
            <motion.div
              key={selectedGranule}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div className="mb-4">
                <SvgGranule
                  color={granulesData.find(g => g.id === selectedGranule)?.color || "#3B82F6"}
                  size={60}
                  animationDelay={0}
                />
              </div>
              <p className="text-lg font-semibold text-slate-900">
                {granulesData.find(g => g.id === selectedGranule)?.name}
              </p>
              <p className="text-sm text-slate-600">Premium Quality EPDM Material</p>
            </motion.div>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-slate-400 font-medium">Hover over a granule to see details</p>
            </motion.div>
          )}
        </div>
        
        {/* Floating background granules */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          >
            <SvgGranule
              color={granulesData[i]?.color || "#3B82F6"}
              size={12}
              animationDelay={i * 0.1}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}