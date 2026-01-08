import { motion } from "framer-motion";
import { Building2, Globe, Handshake, Award, ShieldCheck, HardHat } from "lucide-react";

const clients = [
  { name: "Wonderla Holidays", icon: Building2 },
  { name: "Prestige Group", icon: Building2 },
  { name: "Sobha Developers", icon: HardHat },
  { name: "Gold's Gym", icon: Handshake },
  { name: "Decathlon", icon: Award },
  { name: "BBMP", icon: Globe },
];

export default function ClientsMarquee() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted Partners</p>
      </div>
      
      <div className="flex relative overflow-hidden group select-none">
        <motion.div
          className="flex gap-24 items-center px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div key={index} className="flex items-center space-x-3 text-slate-400 hover:text-primary transition-all duration-300 cursor-default grayscale hover:grayscale-0">
              <client.icon size={36} strokeWidth={1.5} />
              <span className="text-xl font-bold whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </motion.div>
        
        {/* White Fade Edges for seamless look */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}