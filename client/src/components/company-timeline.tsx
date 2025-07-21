import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
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
      event: "Incorporation of Dazzle Systech India Pvt. Ltd.",
      description: "Diversified into full-spectrum digital services, expanding our technology footprint."
    },
    {
      year: "2023",
      event: "Founding of MayimDazzle India Pvt. Ltd.",
      description: "Strengthened our position in digital services through a new entity and strategic growth."
    },
    {
      year: "2024",
      event: "Launch of Mayim Dazzle Polytech",
      description: "Ventured into manufacturing with a focus on EPDM rubber granules for industrial applications."
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-900">Our Journey</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-primary"></div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-4"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={timelineVariants}
            >
              {/* Timeline dot */}
              <motion.div
                className="w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <Card className="bg-white shadow-sm border-l-4 border-accent">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold text-slate-900">{milestone.year}</h4>
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    </div>
                    <p className="font-medium text-slate-700 mb-1">{milestone.event}</p>
                    <p className="text-sm text-slate-600">{milestone.description}</p>
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
