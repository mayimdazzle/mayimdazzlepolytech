import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Palette, ShieldCheck, Check } from "lucide-react";

export default function ProductShowcase() {
  const features = [
    {
      icon: <Ruler className="text-primary" size={24} />,
      title: "Granule Grading",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 mb-2">Precision-cut EPDM granules available in standard industry sizes.</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
             <div className="bg-slate-50 border border-slate-100 p-2 rounded text-center font-semibold text-slate-700">1.0 - 3.0 mm</div>
             <div className="bg-slate-50 border border-slate-100 p-2 rounded text-center font-semibold text-slate-700">0.5 - 1.5 mm</div>
             <div className="bg-slate-50 border border-slate-100 p-2 rounded text-center font-semibold text-slate-700">1.0 - 4.0 mm</div>
             <div className="bg-slate-50 border border-slate-100 p-2 rounded text-center font-semibold text-slate-700">Custom Mix</div>
          </div>
        </div>
      )
    },
    {
      icon: <Palette className="text-accent" size={24} />,
      title: "Color Stability",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">UV-resistant pigments ensuring long-term color retention in harsh climates.</p>
          <div className="flex flex-wrap gap-2">
             {["Red", "Blue", "Green", "Amber", "Purple", "Orange"].map((c, i) => (
               <div key={i} className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: c.toLowerCase() }} />
                  <span className="text-xs font-medium text-slate-700">{c}</span>
               </div>
             ))}
          </div>
        </div>
      )
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: "Technical Properties",
      content: (
        <ul className="space-y-2 text-sm">
          {[
            { label: "Polymer Content", value: "> 20%" },
            { label: "Hardness", value: "60 ± 5 Shore A" },
            { label: "Tensile Strength", value: "> 3.0 Mpa" },
            { label: "Elongation", value: "> 400%" },
          ].map((spec, i) => (
            <li key={i} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-1.5 last:pb-0">
              <span className="text-slate-500">{spec.label}</span>
              <span className="font-bold text-slate-900">{spec.value}</span>
            </li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                 {feature.icon}
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {feature.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}