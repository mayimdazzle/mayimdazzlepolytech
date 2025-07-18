import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Palette, Shield } from "lucide-react";
import SvgGranule from "./svg-granule";

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

const granuleVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ProductShowcase() {
  const products = [
    {
      icon: <Ruler className="text-primary" size={32} />,
      title: "Size Flexibility",
      description: "Custom granule sizes from 1-3mm to 7-8mm",
      colors: ["#F59E0B", "#3B82F6", "#64748B"],
      sizes: [
        { range: "1-3 mm", size: 12 },
        { range: "2-4 mm", size: 16 },
        { range: "7-8 mm", size: 20 }
      ]
    },
    {
      icon: <Palette className="text-accent" size={32} />,
      title: "Color Variety",
      description: "Unlimited color combinations available",
      colors: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#F97316", "#EC4899", "#06B6D4"]
    },
    {
      icon: <Shield className="text-green-600" size={32} />,
      title: "Quality Assured",
      description: "Rigorous testing and certification",
      colors: ["#10B981", "#3B82F6", "#059669"]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {products.map((product, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <Card className="h-full bg-white shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <motion.div 
                className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {product.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4">{product.title}</h3>
              <p className="text-slate-600 mb-6">{product.description}</p>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  {product.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                      <span className="text-sm font-medium">{size.range}</span>
                      <div className="flex items-center justify-center">
                        <SvgGranule
                          color={product.colors[sizeIndex % product.colors.length]}
                          size={size.size}
                          animationDelay={sizeIndex * 0.2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {product.colors && product.colors.length > 1 && (!product.sizes || product.sizes.length === 0) && (
                <div className="grid grid-cols-4 gap-2">
                  {product.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="flex items-center justify-center">
                      <SvgGranule
                        color={color}
                        size={24}
                        animationDelay={colorIndex * 0.1}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {product.specs && (
                <div className="space-y-2 text-sm">
                  {product.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center justify-between">
                      <span>{spec.label}</span>
                      <Badge variant="secondary" className="font-semibold">{spec.value}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
