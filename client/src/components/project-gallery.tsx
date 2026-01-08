import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Using the images you already uploaded
const projects = [
  { src: "/blue-sheet.jpg", title: "Sports Complex", category: "Flooring" },
  { src: "/court.jpg", title: "Basketball Court", category: "Sports" },
  { src: "/playground.jpg", title: "Kids Play Area", category: "Safety" },
  { src: "/gym.jpg", title: "Professional Gym", category: "Fitness" },
  { src: "/installation.jpg", title: "Installation Process", category: "Service" },
  { src: "/sample-strips.jpg", title: "Color Variations", category: "Product" },
];

export default function ProjectGallery() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Projects Gallery</h2>
          <p className="text-xl text-slate-600">Visualizing Excellence Across Sites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  className="group relative overflow-hidden rounded-xl cursor-pointer shadow-md aspect-[4/3]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={project.src}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <ZoomIn className="mb-2" />
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-slate-300">{project.category}</p>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-transparent border-none p-0 shadow-none">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}