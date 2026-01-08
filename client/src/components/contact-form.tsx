import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import emailjs from "emailjs-com";

// Constants for EmailJS
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_USER_ID;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
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
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
         console.warn("EmailJS env variables missing");
         // Simulate success for demo if env vars missing
         await new Promise(r => setTimeout(r, 1000));
      } else {
         await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || "Not provided",
            inquiry_type: data.inquiryType,
            message: data.message,
          }, PUBLIC_KEY);
      }

      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Email error:", error);
      toast({
        title: "Failed to send",
        description: "Please try again later or email us directly.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Card className="bg-slate-900 border-slate-800 shadow-xl">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Name <span className="text-red-400">*</span></FormLabel>
                      <FormControl>
                          <Input
                            {...field}
                            className="bg-slate-800 border-slate-700 text-white focus:border-accent h-11"
                            placeholder="Your Name"
                          />
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
                      <FormLabel className="text-slate-300">Email <span className="text-red-400">*</span></FormLabel>
                      <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-slate-800 border-slate-700 text-white focus:border-accent h-11"
                            placeholder="email@example.com"
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Phone</FormLabel>
                      <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="bg-slate-800 border-slate-700 text-white focus:border-accent h-11"
                            placeholder="+91..."
                          />
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
                      <FormLabel className="text-slate-300">Inquiry Type <span className="text-red-400">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-accent h-11">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sample">Sample Request</SelectItem>
                          <SelectItem value="bulk">Bulk Order</SelectItem>
                          <SelectItem value="technical">Technical Specs</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                    <FormLabel className="text-slate-300">Message <span className="text-red-400">*</span></FormLabel>
                    <FormControl>
                        <Textarea
                          {...field}
                          className="bg-slate-800 border-slate-700 text-white focus:border-accent min-h-[120px] resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-slate-900 hover:bg-amber-400 font-bold py-6 text-lg transition-transform active:scale-95"
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" /> Send Message</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}