// src/components/sections/TestimonialsSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Student, IIT Delhi",
    text: "EDTech completely transformed how I study online. The UI is sleek, fast, and intuitive.",
  },
  {
    name: "Priya Mehta",
    role: "Corporate Trainer",
    text: "Managing multiple courses and learners has never been easier. The analytics tools are top-notch.",
  },
  {
    name: "Rohit Verma",
    role: "School Administrator",
    text: "We deployed EDTech across our institution — it scales effortlessly and the support is phenomenal.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-8 py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
      <p className="text-muted-foreground mb-12">
        Hear from real educators and learners who’ve experienced EDTech firsthand.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="bg-card hover:shadow-lg transition-all">
              <CardContent className="py-8 px-6">
                <Quote className="mx-auto text-primary mb-4 w-6 h-6" />
                <p className="italic mb-4 text-sm text-muted-foreground">"{t.text}"</p>
                <h4 className="font-semibold text-lg">{t.name}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
