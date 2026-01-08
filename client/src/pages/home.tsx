import { useEffect } from "react";
// ... imports remain the same ...
import { motion } from "framer-motion";
import AnimatedNavbar from "@/components/animated-navbar";
import AnimatedHero from "@/components/animated-hero";
import ProductShowcase from "@/components/product-showcase";
import ContactForm from "@/components/contact-form";
import InteractiveGranuleShowcase from "@/components/interactive-granule-showcase";
import ClientsMarquee from "@/components/clients-marquee";
import ProjectGallery from "@/components/project-gallery";
import StatsSection from "@/components/stats-section";
import BrochureGenerator from "@/components/brochure-generator";
import CompanyTimeline from "@/components/company-timeline";
import GranulePileAnimation from "@/components/granule-pile-animation";
import { ArrowRight, ChevronRight, Layers, ShieldCheck, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Helper for scroll
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans" id="home">
      <AnimatedNavbar />
      
      <main>
        <AnimatedHero />
        
        <section className="bg-slate-900 py-12 border-b border-slate-800">
           <StatsSection />
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Our Expertise</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Engineered for Performance</h2>
              <p className="text-lg text-slate-600">
                We deliver specialized EPDM granule solutions tailored to the unique demands of global sports, safety, and industrial sectors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Cards with Fixed Links */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all group cursor-pointer" onClick={() => scrollTo('contact')}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Sports Surfaces</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Shock-absorbing granules for running tracks, tennis courts, and multipurpose arenas.
                </p>
                <span className="text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Request Specs <ChevronRight size={16} className="ml-1" />
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all group cursor-pointer" onClick={() => scrollTo('contact')}>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Playground Safety</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Critical Fall Height (CFH) compliant surfaces. UV-stable colors.
                </p>
                <span className="text-amber-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  View Safety Data <ChevronRight size={16} className="ml-1" />
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all group cursor-pointer" onClick={() => scrollTo('contact')}>
                <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Industrial Flooring</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Heavy-duty, chemical-resistant rubber compounding.
                </p>
                <span className="text-slate-700 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Industrial Solutions <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-20">
               <ProductShowcase />
            </div>
          </div>
        </section>

        {/* 4. INNOVATION / COLOR MIXER */}
        <section id="innovation" className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-500 mb-6">
                  Interactive Tools
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Visualizing Excellence</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Use our interactive tool to explore our standard vibrant palette tailored for high-UV environments.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {['ISO 9001:2015 Certified Process', '100% Virgin Polymer Base', 'Custom Color Matching'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <CheckCircle2 className="text-primary mr-3" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Fixed: Scroll to the color mixer on the right */}
                <Button 
                  onClick={() => document.getElementById('color-mixer-panel')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 h-12"
                >
                  Start Color Mixer
                </Button>
              </div>
              
              <div className="relative" id="color-mixer-panel">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-amber-50 rounded-3xl transform rotate-3 scale-105" />
                 <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                    <InteractiveGranuleShowcase />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROJECT GALLERY */}
        <ProjectGallery />

        {/* 6. COMPANY HISTORY & DOWNLOADS */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left: Timeline */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">A Legacy of Innovation</h2>
                <CompanyTimeline />
              </div>

              {/* Right: Brochure & Visuals */}
              <div className="flex flex-col gap-8">
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold mb-4">Manufacturing Excellence</h3>
                    <GranulePileAnimation />
                 </div>
                 
                 <div id="downloads">
                    <h3 className="text-xl font-bold mb-4">Downloads</h3>
                    <BrochureGenerator />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CLIENTS */}
        <ClientsMarquee />

        {/* 8. CONTACT */}
        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
               <div className="p-10 md:p-12 md:w-1/2 bg-slate-900 text-white flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Let's Build Together</h2>
                    <p className="text-slate-300 mb-8">
                      Whether you need a sample kit or a full container load quote, our technical sales team is ready to assist.
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-start gap-4">
                          <div className="bg-white/10 p-2 rounded text-accent"><CheckCircle2 size={20}/></div>
                          <div>
                             <div className="font-bold">Headquarters</div>
                             <div className="text-slate-400 text-sm">Dharmapuri, Tamil Nadu, India</div>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="bg-white/10 p-2 rounded text-accent"><CheckCircle2 size={20}/></div>
                          <div>
                             <div className="font-bold">Direct Line</div>
                             <div className="text-slate-400 text-sm">+91 94883 94000</div>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="mt-12 text-xs text-slate-500">
                     MayimDazzle India Pvt Ltd © 2025
                  </div>
               </div>
               
               <div className="p-8 md:p-12 md:w-1/2">
                  <ContactForm />
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-slate-900">Mayim Dazzle Polytech</span>
            <span className="mx-2">|</span>
            <span>A Subsidiary of MayimDazzle India Pvt Ltd</span>
          </div>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
             <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}