import { motion } from "framer-motion";
import { Building2, Globe, Handshake, Award } from "lucide-react";

// Replace these with your actual client logo URLs
const clients = [
  { name: "Client 1", icon: Building2 },
  { name: "Client 2", icon: Globe },
  { name: "Client 3", icon: Handshake },
  { name: "Client 4", icon: Award },
  { name: "Client 5", icon: Building2 },
  { name: "Client 6", icon: Globe },
];

export default function ClientsMarquee() {
  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-xl font-semibold text-slate-500">Trusted by Industry Leaders</h3>
      </div>
      
      <div className="flex relative overflow-hidden">
        {/* We duplicate the list to create a seamless loop */}
        <motion.div
          className="flex gap-16 items-center px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div key={index} className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors cursor-pointer group">
              <client.icon size={40} strokeWidth={1.5} />
              <span className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}