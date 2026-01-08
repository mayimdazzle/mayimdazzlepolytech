import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SvgLogo from "./svg-logo";

export default function AnimatedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: "home", label: "Home" },
    { href: "products", label: "Sectors" },
    { href: "gallery", label: "Projects" },
    { href: "contact", label: "Contact" }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-slate-200" 
          : "bg-white py-5 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <div className="text-primary">
             <SvgLogo size={40} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-slate-900 leading-none tracking-tight">
              Mayim Dazzle
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              Polytech
            </span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors uppercase tracking-wide bg-transparent border-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-blue-700 text-white font-bold rounded-full px-6"
          >
            Get Quote
          </Button>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="text-slate-900" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-10">
                {navItems.map((item) => (
                  <button 
                    key={item.href} 
                    onClick={() => { scrollToSection(item.href); }}
                    className="text-xl font-bold text-slate-900 text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}