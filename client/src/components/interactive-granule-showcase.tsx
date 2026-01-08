import { motion } from "framer-motion";
import { useState } from "react";
import SvgGranule from "./svg-granule";

const granulesData = [
  { id: 1, color: "#EF4444", size: 20, name: "Red" },
  { id: 2, color: "#3B82F6", size: 24, name: "Blue" },
  { id: 3, color: "#10B981", size: 18, name: "Green" },
  { id: 4, color: "#F59E0B", size: 22, name: "Amber" },
  { id: 5, color: "#8B5CF6", size: 20, name: "Purple" },
  { id: 6, color: "#EC4899", size: 26, name: "Pink" },
  { id: 7, color: "#F97316", size: 19, name: "Orange" },
  { id: 8, color: "#06B6D4", size: 23, name: "Cyan" },
];

export default function InteractiveGranuleShowcase() {
  const [selectedGranule, setSelectedGranule] = useState<number | null>(null);

  // Helper for mobile touch
  const handleTouch = (id: number) => {
    setSelectedGranule(id === selectedGranule ? null : id);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8 rounded-2xl shadow-inner border border-white">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Color Palette</h3>
        <p className="text-slate-600 text-sm md:text-base">Tap or hover over granules to preview</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {granulesData.map((granule, index) => (
          <motion.div
            key={granule.id}
            className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer border-2 transition-colors ${selectedGranule === granule.id ? 'border-primary' : 'border-transparent'}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setSelectedGranule(granule.id)}
            onClick={() => handleTouch(granule.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="mb-3">
              <SvgGranule
                color={granule.color}
                size={granule.size}
                animationDelay={index * 0.1}
              />
            </div>
            <span className="text-sm text-slate-700 font-semibold">{granule.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Animated showcase area */}
      <div className="relative h-48 sm:h-56 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />

        <div className="relative z-10 w-full px-4">
          {selectedGranule ? (
            <motion.div
              key={selectedGranule}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="mb-4 flex justify-center">
                <SvgGranule
                  color={granulesData.find(g => g.id === selectedGranule)?.color || "#3B82F6"}
                  size={80} // Larger size for showcase
                  animationDelay={0}
                />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">
                {granulesData.find(g => g.id === selectedGranule)?.name} Series
              </h4>
              <p className="text-sm text-slate-500">High-grade EPDM • Weather Resistant</p>
            </motion.div>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-slate-400 font-medium text-sm sm:text-base px-6">
                Select a color above to see details
              </p>
            </motion.div>
          )}
        </div>
        
        {/* Floating background granules - optimized positions */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10 pointer-events-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <SvgGranule
              color={granulesData[i]?.color || "#3B82F6"}
              size={16}
              animationDelay={i * 0.2}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}