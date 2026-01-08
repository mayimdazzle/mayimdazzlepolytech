import { motion } from "framer-motion";
import { useState } from "react";
import SvgGranule from "./svg-granule";

const granulesData = [
  { id: 1, color: "#EF4444", size: 20, name: "Red 404" },
  { id: 2, color: "#3B82F6", size: 24, name: "Blue 505" },
  { id: 3, color: "#10B981", size: 18, name: "Green 602" },
  { id: 4, color: "#F59E0B", size: 22, name: "Amber 101" },
  { id: 5, color: "#8B5CF6", size: 20, name: "Purple 303" },
  { id: 6, color: "#EC4899", size: 26, name: "Pink 202" },
  { id: 7, color: "#F97316", size: 19, name: "Orange 105" },
  { id: 8, color: "#06B6D4", size: 23, name: "Cyan 502" },
];

export default function InteractiveGranuleShowcase() {
  const [selectedGranule, setSelectedGranule] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {granulesData.map((granule, index) => (
          <motion.button
            key={granule.id}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
              selectedGranule === granule.id 
                ? 'bg-white border-primary shadow-md ring-2 ring-primary/10' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setSelectedGranule(granule.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2">
              <SvgGranule color={granule.color} size={granule.size} animationDelay={0} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{granule.name}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Lab Viewer Screen */}
      <div className="relative h-64 bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center">
        {/* Graph Paper Background */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {selectedGranule ? (
          <motion.div
            key={selectedGranule}
            className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-4 flex justify-center drop-shadow-xl">
              <SvgGranule
                color={granulesData.find(g => g.id === selectedGranule)?.color || "#3B82F6"}
                size={100}
                animationDelay={0}
              />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-1">
              {granulesData.find(g => g.id === selectedGranule)?.name}
            </h4>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mt-2">
               Technical Grade EPDM
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-slate-400">
            <p className="font-medium text-sm">Select a pigment sample to inspect</p>
          </div>
        )}
      </div>
    </div>
  );
}