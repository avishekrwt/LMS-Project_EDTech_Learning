// src/components/sections/FeaturesSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Users, ChartBar, Globe, Upload, BookOpen, Clock, Code } from "lucide-react";

const features = [
  { icon: Book, title: "Courses", desc: "Build and manage interactive courses effortlessly." },
  { icon: Users, title: "Community", desc: "Engage learners through forums and groups." },
  { icon: ChartBar, title: "Analytics", desc: "Track learner progress and engagement metrics." },
  { icon: Globe, title: "Scalability", desc: "Deploy learning globally with zero friction." },
  { icon: Upload, title: "Teacher-Centric Uploads", desc: "Free, easy content sharing tailored to specialization." },
  { icon: BookOpen, title: "Learning Path", desc: "Flexible, self-paced courses with certification." },
  { icon: Clock, title: "Smart Attendance", desc: "Automated inactivity detection and skip prevention." },
  { icon: Code, title: "Custom API", desc: "Robust, dependency-free integration and performance." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Features</h2>
      <p className="text-muted-foreground mb-12">Core and advanced capabilities in one place.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="py-10">
                <f.icon className="mx-auto mb-4 text-primary w-10 h-10" />
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground mt-2">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
