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
import ClientsMarquee from "@/components/clients-marquee";
import ProjectGallery from "@/components/project-gallery";
import StatsSection from "@/components/stats-section";
import { Factory, MapPin, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Home() {
  useEffect(() => {
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
    <div className="min-h-screen bg-white overflow-x-hidden font-sans" id="home">
      <ParticleBackground />
      <AnimatedNavbar />
      
      <main>
        {/* 1. Hero Section */}
        <AnimatedHero />
        
        {/* 2. Trust Indicators */}
        <ClientsMarquee />
        
        {/* 3. Main Product Focus */}
        <motion.section 
          id="products"
          className="py-24 bg-slate-50 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Core Product</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Premium EPDM Granules</h2>
              <p className="text-xl text-slate-600">
                Engineered for durability, available in vibrant colors, and customized for your specific application needs.
              </p>
            </div>
            
            <ProductShowcase />
            
            <div className="mt-20">
              <InteractiveGranuleShowcase />
            </div>
          </div>
        </motion.section>

        {/* 4. Stats & Impact */}
        <StatsSection />

        {/* 5. Project Gallery (New Site Photos) */}
        <ProjectGallery />

        {/* 6. Company History/About */}
        <motion.section 
          id="about"
          className="py-24 bg-white relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            {/* items-stretch ensures both columns are same height */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto">
              
              <div className="order-2 lg:order-1 relative h-full min-h-[500px]">
                 {/* Background Blur Effect */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                 {/* Animation fills the height */}
                 <GranulePileAnimation className="h-full w-full" />
              </div>
              
              <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8 py-4">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">A Legacy of Innovation</h2>
                  <div className="prose prose-lg text-slate-600">
                    <p className="mb-4">
                      <strong>Mayim Dazzle Polytech</strong> represents the convergence of manufacturing excellence and technological innovation. 
                      As a subsidiary of <strong>MayimDazzle India Pvt Ltd</strong>, we carry forward a 20-year legacy started by Dazzle Infomedia.
                    </p>
                    <p>
                      Located in Dharmapuri, Tamil Nadu, our state-of-the-art facility is dedicated to producing high-grade EPDM rubber granules 
                      that set industry standards for color consistency and weather resistance.
                    </p>
                  </div>
                </div>
                
                <CompanyTimeline />
                
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. Contact */}
        <motion.section 
          id="contact"
          className="py-24 bg-slate-900 text-white relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Let's Build Something Great</h2>
                  <p className="text-xl text-slate-300 mb-10">
                    Need a quote for your next sports complex or playground project? 
                    Our team is ready to assist with samples and technical specifications.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Factory Address</h4>
                        <p className="text-slate-400 mt-1">Dharmapuri, Tamil Nadu, India</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Contact Number</h4>
                        <p className="text-slate-400 mt-1">+91 94883 94000</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Email Us</h4>
                        <p className="text-slate-400 mt-1">info@polytech.mayimdazzle.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary p-2 rounded-lg">
                        <Factory className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Parent Company</div>
                        <div className="text-sm text-slate-400">MayimDazzle India Pvt Ltd</div>
                      </div>
                    </div>
                    <a 
                      href="https://mayimdazzle.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-white transition-colors flex items-center"
                    >
                      Visit Corporate Website <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Mayim Dazzle Polytech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}