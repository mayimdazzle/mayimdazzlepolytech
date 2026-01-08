import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { generateCompanyBrochure } from "@/lib/pdf-generator";

export default function BrochureGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBrochure = async () => {
    setIsGenerating(true);
    try {
      await generateCompanyBrochure();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-left flex flex-col md:flex-row items-center gap-6 shadow-xl">
       <div className="bg-white p-4 rounded-xl text-primary shadow-lg">
          <FileText size={40} />
       </div>
       <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">Download Corporate Brochure</h3>
          <p className="text-slate-400 text-sm">Full catalog, technical data sheets (TDS), and company certifications.</p>
       </div>
       <Button 
          onClick={generateBrochure}
          disabled={isGenerating}
          size="lg"
          className="bg-accent hover:bg-amber-500 text-slate-900 font-bold whitespace-nowrap"
        >
          {isGenerating ? "Processing..." : (
             <span className="flex items-center"><Download className="mr-2" size={18} /> Download PDF</span>
          )}
        </Button>
    </div>
  );
}