import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function CompanyTimeline() {
  const milestones = [
    {
      year: "2003",
      event: "Establishment of Dazzle Infomedia",
      description: "Launched as a software solutions provider, laying the foundation for digital innovation."
    },
    {
      year: "2014",
      event: "Incorporation of Dazzle Systech",
      description: "Diversified into full-spectrum digital services, expanding our technology footprint."
    },
    {
      year: "2023",
      event: "Founding of MayimDazzle India",
      description: "Strengthened our position in digital services through a new entity and strategic growth."
    },
    {
      year: "2024",
      event: "Launch of Polytech Division",
      description: "Ventured into manufacturing with a focus on EPDM rubber granules for industrial applications."
    }
  ];

  return (
    <div className="space-y-6 md:pl-4">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Journey</h3>
      <div className="relative pl-2 md:pl-0">
        {/* Timeline line */}
        <div className="absolute left-[19px] md:left-[15px] top-2 bottom-4 w-0.5 bg-gradient-to-b from-accent to-slate-200"></div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative flex items-start gap-4 md:gap-6"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={timelineVariants}
            >
              {/* Timeline dot */}
              <div className="shrink-0 z-10">
                <motion.div
                    className="w-10 h-10 md:w-8 md:h-8 bg-white rounded-full border-[3px] border-accent shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                >
                    <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <Card className="bg-white hover:bg-slate-50 transition-colors shadow-sm border-slate-200">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                      <span className="font-bold text-accent text-lg">{milestone.year}</span>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">{milestone.event}</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 