import { motion } from "framer-motion";

const milestones = [
  { year: "2003", title: "Foundation", desc: "Established Dazzle Infomedia, laying the groundwork for excellence." },
  { year: "2014", title: "Expansion", desc: "Incorporated Dazzle Systech, expanding into new industrial verticals." },
  { year: "2023", title: "Consolidation", desc: "Founded MayimDazzle India Pvt Ltd as the parent entity." },
  { year: "2024", title: "Manufacturing", desc: "Launched Mayim Dazzle Polytech to lead EPDM granule manufacturing." },
];

export default function CompanyTimeline() {
  return (
    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 my-8">
      {milestones.map((item, index) => (
        <motion.div 
          key={index} 
          className="mb-10 ml-6 relative"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Dot */}
          <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1">
            <span className="text-accent font-bold text-xl">{item.year}</span>
            <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-lg">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}