import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Users, Factory } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "20+", icon: Trophy },
  { label: "Projects Delivered", value: "500+", icon: CheckCircle2 },
  { label: "Satisfied Clients", value: "150+", icon: Users },
  { label: "Capacity (MT)", value: "1000", icon: Factory },
];

export default function StatsSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center px-4"
          >
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-blue-100 uppercase tracking-wider flex items-center justify-center gap-2">
              <stat.icon size={16} /> {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}