import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Factory } from "lucide-react";
import { generateCompanyBrochure } from "@/lib/pdf-generator"; // Adjust the import path as necessary

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
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-lg">
      <CardContent className="p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <motion.div
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="text-white" size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Company Brochure</h3>
            <p className="text-slate-600">
              Download our comprehensive brochure with product details, company information, and contact details.
            </p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={generateBrochure}
              disabled={isGenerating}
              size="lg"
              className="bg-accent text-slate-900 hover:bg-amber-400 font-semibold px-8 py-3"
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full mr-3"
                />
              ) : (
                <Download className="mr-3" size={20} />
              )}
              {isGenerating ? 'Generating...' : 'Download Brochure'}
            </Button>
          </motion.div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="flex items-center justify-center space-x-2">
              <Factory size={16} className="text-primary" />
              <span>Company Info</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <span>Product Details</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Contact Info</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}