import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedNavbar from "@/components/animated-navbar";
import AnimatedHero from "@/components/animated-hero";
import ProductShowcase from "@/components/product-showcase";
import CompanyTimeline from "@/components/company-timeline";
import ContactForm from "@/components/contact-form";
import ParticleBackground from "@/components/particle-background";
import InteractiveGranuleShowcase from "@/components/interactive-granule-showcase";
import GranulePileAnimation from "@/components/granule-pile-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, Palette, Shield, Ruler, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <ParticleBackground />
      <AnimatedNavbar />
      <AnimatedHero />
      
      {/* About Section */}
      <motion.section 
        id="about"
        className="py-20 bg-white relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={sectionVariants}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">About Mayim Dazzle Polytech</h2>
              <p className="text-xl text-slate-600">20+ Years of Legacy in Industrial Solutions</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative"
                variants={cardVariants}
                whileHover="hover"
              >
                <GranulePileAnimation />
              </motion.div>
              
              <div className="space-y-6">
                <motion.div 
                  className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Heritage</h3>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Mayim Dazzle Polytech</strong> is the newest subsidiary of 
                    <strong> MayimDazzle India Private Limited</strong>, drawing from the rich legacy 
                    of <strong>Dazzle Infomedia</strong> — a trusted name in software and industrial 
                    solutions for over 20 years.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-accent/5 to-primary/5 p-6 rounded-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Operating from India, we focus on manufacturing <strong>EPDM Rubber Granules</strong> 
                    with unmatched flexibility in color and size customization, backed by experienced 
                    rubber technologists.
                  </p>
                </motion.div>
                
                <CompanyTimeline />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section 
        id="products"
        className="py-20 bg-slate-50 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={sectionVariants}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">EPDM Rubber Granules</h2>
              <p className="text-xl text-slate-600">Precision-Engineered for Superior Performance</p>
            </motion.div>
            
            <ProductShowcase />
            
            {/* Interactive Granule Showcase */}
            <motion.div 
              className="mt-12"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <InteractiveGranuleShowcase />
            </motion.div>
            
            {/* Quality Excellence */}
            <motion.div 
              className="mt-12 bg-white p-8 rounded-xl shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality Excellence</h3>
                <p className="text-slate-600">Superior performance for demanding applications</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { value: "Superior", label: "Weather Resistance", color: "from-primary/10 to-accent/10" },
                  { value: "Excellent", label: "Durability", color: "from-accent/10 to-primary/10" },
                  { value: "Premium", label: "Quality", color: "from-green-100 to-blue-100" }
                ].map((spec, index) => (
                  <motion.div 
                    key={index}
                    className={`text-center p-6 bg-gradient-to-br ${spec.color} rounded-lg`}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{spec.value}</div>
                    <div className="text-sm text-slate-600">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Applications Section */}
      <motion.section 
        className="py-20 bg-white relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={sectionVariants}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Applications</h2>
              <p className="text-xl text-slate-600">Versatile Solutions for Multiple Industries</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                  title: "Sports Flooring",
                  description: "High-performance surfaces for athletic facilities, gyms, and sports complexes"
                },
                {
                  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                  title: "Playground Safety",
                  description: "Safe, durable surfaces for playgrounds and recreational areas"
                },
                {
                  image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                  title: "Industrial Safety",
                  description: "Anti-slip surfaces for industrial environments and safety applications"
                }
              ].map((app, index) => (
                <motion.div 
                  key={index}
                  className="bg-slate-50 p-8 rounded-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="rounded-lg w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{app.title}</h3>
                  <p className="text-slate-600">{app.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="py-20 bg-slate-900 text-white relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={sectionVariants}
            >
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-slate-300">Ready to collaborate? Contact us for samples, queries, or orders</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <ContactForm />
              
              <motion.div 
                className="space-y-8"
                variants={cardVariants}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-accent" size={20} />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-slate-300">Dharmapuri, Tamil Nadu, India</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-accent" size={20} />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-slate-300">Contact via parent company</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="text-accent" size={20} />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-slate-300">info@polytech.mayimdazzle.com</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="bg-slate-800 p-6 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold mb-4">Parent Company</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Factory size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">MayimDazzle India Private Limited</div>
                      <div className="text-sm text-slate-400">Software Engineering & Solutions</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-300 mb-4">
                    <p>Visit our parent company for web design, application development, and offshore software services.</p>
                  </div>
                  <a 
                    href="https://mayimdazzle.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:text-amber-400 transition-colors"
                  >
                    <span className="mr-2">Visit MayimDazzle.com</span>
                    <ExternalLink size={16} />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Factory size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Mayim Dazzle Polytech</div>
                    <div className="text-xs text-slate-400">Manufacturing Excellence</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Precision-engineered EPDM rubber granules for superior performance applications.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>EPDM Granules</li>
                  <li>Custom Colors</li>
                  <li>Multiple Sizes</li>
                  <li>Quality Assured</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Applications</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Sports Flooring</li>
                  <li>Playground Safety</li>
                  <li>Industrial Safety</li>
                  <li>Custom Solutions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                  <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
                  <li><a href="https://mayimdazzle.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Parent Company</a></li>
                  <li>Quality Assurance</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
              <p>&copy; 2024 Mayim Dazzle Polytech. A subsidiary of MayimDazzle India Private Limited. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
