import { motion } from "framer-motion";
import { Building2, Globe, Handshake, Award, ShieldCheck, HardHat } from "lucide-react";

const clients = [
  { name: "Wonderla Holidays", icon: Building2 }, // Highlight your new client
  { name: "Prestige Group", icon: Building2 },
  { name: "Sobha Developers", icon: HardHat },
  { name: "Gold's Gym", icon: Handshake },
  { name: "Decathlon Sports", icon: Award },
  { name: "BBMP Parks", icon: Globe },
];

export default function ClientsMarquee() {
  return (
    <section className="py-10 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted by Industry Leaders</p>
      </div>
      
      <div className="flex relative overflow-hidden group select-none">
        <motion.div
          className="flex gap-20 items-center px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Quadruple the list for ultra-smooth loop on 4k screens */}
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div key={index} className="flex items-center space-x-3 text-slate-400 hover:text-primary transition-all duration-300 cursor-default grayscale hover:grayscale-0 hover:scale-105">
              <client.icon size={28} strokeWidth={1.5} />
              <span className="text-lg font-bold whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}