import { motion } from "framer-motion";
import { ZoomIn, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Updated with your images
const projects = [
  { 
    src: "/Wonderla Site Project/IMG-20251009-WA0006.jpg", 
    title: "Wonderla Theme Park", 
    category: "Recreational",
    location: "Bangalore",
    className: "md:col-span-2 md:row-span-2" 
  },
  { 
    src: "/court.jpg", 
    title: "Pro Sports Complex", 
    category: "Sports",
    location: "Karnataka",
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    src: "/playground.jpg", 
    title: "Intl. School Play Area", 
    category: "Safety",
    location: "Hyderabad",
    className: "md:col-span-1 md:row-span-1"
  },
  { 
    src: "/gym.jpg", 
    title: "Gold's Gym Flooring", 
    category: "Fitness",
    location: "Mumbai",
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
    src: "/Wonderla Site Project/IMG-20251009-WA0016.jpg", 
    title: "Kids Safety Zone", 
    category: "Playground",
    location: "Wonderla",
    className: "md:col-span-2 md:row-span-1" 
  }
];

export default function ProjectGallery() {
  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Selected Projects</h2>
            <p className="text-lg text-slate-600">
              From high-traffic theme parks to professional athletic surfaces, our granules define durability.
            </p>
          </div>
          <div className="hidden md:block">
             <Badge variant="outline" className="px-4 py-2 text-sm rounded-full border-slate-300 text-slate-600">
                View Full Portfolio
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  className={`group relative overflow-hidden rounded-lg cursor-pointer bg-slate-100 ${project.className}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={project.src}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Clean White Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                         <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">
                            {project.category}
                         </span>
                         <h3 className="text-xl font-bold text-white leading-tight">
                            {project.title}
                         </h3>
                         <div className="flex items-center text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MapPin size={14} className="mr-1" /> {project.location}
                         </div>
                      </div>
                      <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                         <ZoomIn className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl bg-white border-none p-1 shadow-2xl rounded-xl">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full max-h-[85vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                    <p className="text-slate-600 flex items-center gap-2 mt-1">
                      <MapPin size={16} className="text-primary" /> {project.location}
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