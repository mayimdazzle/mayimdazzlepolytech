import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, CheckCircle2, Users, Factory } from "lucide-react";

const stats = [
  { label: "Years Experience", value: 20, suffix: "+", icon: Trophy },
  { label: "Projects Completed", value: 500, suffix: "+", icon: CheckCircle2 },
  { label: "Happy Clients", value: 150, suffix: "+", icon: Users },
  { label: "Tons Manufactured", value: 1000, suffix: "MT", icon: Factory },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-slate-900">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}
        </motion.span>
      ) : (
        0
      )}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 relative bg-primary overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <stat.icon size={24} />
                </div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-slate-200 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Certifications Preview */}
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Certified Excellence</h3>
                <p className="text-slate-600 mb-6 text-lg">
                    We adhere to strict international standards for safety and environmental impact. 
                    Our products are rigorously tested for durability and non-toxicity.
                </p>
                <ul className="space-y-3">
                    {['ISO 9001:2015 Certified', 'Environment Friendly', 'Safety Compliant'].map((item, i) => (
                        <li key={i} className="flex items-center text-slate-700">
                            <CheckCircle2 className="text-green-500 mr-3" size={20} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-accent rounded-lg rotate-3 group-hover:rotate-6 transition-transform opacity-20" />
                <img 
                    src="/certifications and awards.jpg" 
                    alt="Certifications" 
                    className="relative rounded-lg shadow-lg border border-slate-200 z-10"
                />
            </div>
          </motion.div>
        </div>
    </section>
  );
}