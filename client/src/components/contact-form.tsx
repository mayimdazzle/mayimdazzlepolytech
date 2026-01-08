import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, Info } from "lucide-react";
import emailjs from "emailjs-com";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", inquiryType: "", message: "" }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Logic for EmailJS would go here
      await new Promise(r => setTimeout(r, 1500)); // Simulating request
      toast({ title: "Request Received", description: "Our technical team will contact you shortly." });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">Full Name</FormLabel>
                  <FormControl>
                      <Input {...field} className="bg-white border-slate-300 focus:border-primary focus:ring-primary/10 h-12" placeholder="e.g. John Smith" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">Email Address</FormLabel>
                  <FormControl>
                      <Input {...field} type="email" className="bg-white border-slate-300 focus:border-primary focus:ring-primary/10 h-12" placeholder="name@company.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">Phone Number</FormLabel>
                  <FormControl>
                      <Input {...field} type="tel" className="bg-white border-slate-300 focus:border-primary focus:ring-primary/10 h-12" placeholder="+91..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">Inquiry Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border-slate-300 focus:border-primary focus:ring-primary/10 h-12">
                        <SelectValue placeholder="Select Topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sample">Sample Request</SelectItem>
                      <SelectItem value="bulk">Bulk Order</SelectItem>
                      <SelectItem value="technical">Technical Specs</SelectItem>
                      <SelectItem value="distributorship">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Project Details</FormLabel>
                <FormControl>
                    <Textarea {...field} className="bg-white border-slate-300 focus:border-primary focus:ring-primary/10 min-h-[150px] resize-none" placeholder="Describe your project requirements, estimated area, and timeline..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-4">
             <div className="hidden md:flex items-center text-xs text-slate-500 max-w-xs">
                <Info size={14} className="mr-2 shrink-0" />
                <span>We respect your privacy. Your data is processed according to our privacy policy.</span>
             </div>
             <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg shadow-blue-900/10">
                {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <Send className="mr-2" size={18} />}
                Send Inquiry
             </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}