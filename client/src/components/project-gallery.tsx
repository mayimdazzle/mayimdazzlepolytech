import { motion } from "framer-motion";
import { ZoomIn, MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Updated with your new Wonderla Site Project photos and existing assets
const projects = [
  { 
    src: "/Wonderla Site Project/IMG-20251009-WA0006.jpg", 
    title: "Theme Park Flooring", 
    category: "Recreational",
    location: "Wonderla Amusement Park",
    className: "md:col-span-2 md:row-span-2" // Large feature image
  },
  { 
    src: "/court.jpg", 
    title: "Professional Sports Court", 
    category: "Sports",
    location: "Bangalore Sports Complex",
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    src: "/Wonderla Site Project/IMG-20251009-WA0008.jpg", 
    title: "Water Park Safety Surface", 
    category: "Safety",
    location: "Wonderla",
    className: "md:col-span-1 md:row-span-1"
  },
  { 
    src: "/gym.jpg", 
    title: "Premium Gym Flooring", 
    category: "Fitness",
    location: "Gold's Gym",
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    src: "/Wonderla Site Project/IMG-20251011-WA0002.jpg", 
    title: "Walkway Installation", 
    category: "Infrastructure",
    location: "Wonderla Site",
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    src: "/Wonderla Site Project/WhatsApp Image 2025-10-12 at 13.56.11_715da06b.jpg", 
    title: "EPDM Granule Mixing", 
    category: "Process",
    location: "On-Site",
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    src: "/Wonderla Site Project/IMG-20251009-WA0016.jpg", 
    title: "Kids Play Zone", 
    category: "Playground",
    location: "Wonderla",
    className: "md:col-span-2 md:row-span-1" // Wide image
  }
];

export default function ProjectGallery() {
  return (
    <section className="py-24 bg-slate-50" id="gallery">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1">Portfolio</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Work in Action</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From premier amusement parks like <strong>Wonderla</strong> to professional sports complexes, 
            explore how our EPDM solutions transform spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-6">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all ${project.className}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder while loading */}
                  <img
                    src={project.src}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2 bg-accent text-slate-900 hover:bg-accent/90">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      {project.title} <ZoomIn size={16} className="text-accent" />
                    </h3>
                    <div className="flex items-center text-slate-300 text-sm">
                      <MapPin size={14} className="mr-1" /> {project.location}
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl bg-transparent border-none p-0 shadow-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full max-h-[85vh] object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-slate-300 flex items-center gap-2 mt-1">
                      <MapPin size={16} /> {project.location}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}