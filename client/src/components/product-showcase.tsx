import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Palette, Shield } from "lucide-react";
import SvgGranule from "./svg-granule";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    y: -5,
    transition: { duration: 0.2 }
  }
};

export default function ProductShowcase() {
  const products = [
    {
      icon: <Ruler className="text-primary" size={28} />,
      title: "Size Flexibility",
      description: "Custom granule sizes tailored to your needs",
      colors: ["#F59E0B", "#3B82F6", "#64748B"],
      sizes: [
        { range: "1-3 mm", size: 12 },
        { range: "2-4 mm", size: 16 },
        { range: "7-8 mm", size: 20 }
      ]
    },
    {
      icon: <Palette className="text-accent" size={28} />,
      title: "Color Variety",
      description: "Unlimited vibrant color combinations available",
      colors: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#F97316", "#EC4899", "#06B6D4"]
    },
    {
      icon: <Shield className="text-green-600" size={28} />,
      title: "Quality Assured",
      description: "Rigorous testing and ISO certification",
      specs: [
          { label: "Durability", value: "High" },
          { label: "UV Stable", value: "Yes" },
          { label: "Eco-Safe", value: "Yes" }
      ],
      colors: ["#10B981", "#3B82F6", "#059669"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
      {products.map((product, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, margin: "-50px" }}
          className="h-full"
        >
          <Card className="h-full bg-white shadow-md hover:shadow-xl transition-shadow border-slate-100 overflow-hidden">
            <CardContent className="p-6 md:p-8 text-center flex flex-col h-full">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                {product.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{product.title}</h3>
              <p className="text-slate-600 mb-6 text-sm flex-grow">{product.description}</p>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3 mt-auto">
                  {product.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-sm font-semibold text-slate-700">{size.range}</span>
                      <div className="flex items-center justify-center w-8">
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
                <div className="grid grid-cols-4 gap-3 mt-auto justify-items-center">
                  {product.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="p-1">
                      <SvgGranule
                        color={color}
                        size={22}
                        animationDelay={colorIndex * 0.1}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {product.specs && (
                <div className="space-y-2 mt-auto text-sm">
                  {product.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center justify-between border-b border-slate-50 last:border-0 py-1">
                      <span className="text-slate-500">{spec.label}</span>
                      <Badge variant="outline" className="font-medium bg-green-50 text-green-700 border-green-100">{spec.value}</Badge>
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