import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import SvgLogo from "./svg-logo";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function AnimatedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#products", label: "Products" },
    { href: "#contact", label: "Contact" }
  ];

  const navbarVariants = {
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      height: "70px"
    },
    top: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.0)",
      height: "80px"
    }
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 flex items-center transition-all duration-300"
      animate={isScrolled ? "scrolled" : "top"}
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="shrink-0">
                <SvgLogo size={isScrolled ? 32 : 40} />
            </div>
            <div>
              <h1 className={`font-bold text-primary leading-tight transition-all ${isScrolled ? 'text-lg' : 'text-lg md:text-xl'}`}>
                Mayim Dazzle Polytech
              </h1>
              <p className="text-[10px] md:text-xs text-slate-600 font-medium">A MayimDazzle Subsidiary</p>
            </div>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          
          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100/50">
                  <Menu className="h-6 w-6 text-slate-800" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] border-l-slate-200 bg-white/95 backdrop-blur-xl">
                 <VisuallyHidden.Root>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>Access site sections</SheetDescription>
                  </VisuallyHidden.Root>
                <div className="flex flex-col h-full mt-8">
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        className="text-2xl font-semibold text-slate-800 hover:text-primary transition-colors py-2 border-b border-slate-100"
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </div>
                  <div className="mt-auto mb-8">
                      <p className="text-sm text-slate-500 text-center">© 2024 Mayim Dazzle</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}