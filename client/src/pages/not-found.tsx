import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ParticleBackground from "@/components/particle-background";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <ParticleBackground />
      
      <Card className="w-full max-w-md mx-4 bg-white shadow-xl border-slate-200 relative z-10">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
             <div className="bg-red-50 p-4 rounded-full">
                <AlertCircle className="h-12 w-12 text-red-500" />
             </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Page Not Found</h1>
          <p className="text-slate-600 mb-8">
            The resource you are looking for might have been removed or is temporarily unavailable.
          </p>

          <Link href="/">
            <Button className="w-full bg-primary hover:bg-blue-700 text-white font-bold h-12">
              Return to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}