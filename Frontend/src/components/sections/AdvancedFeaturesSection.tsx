// src/components/sections/AdvancedFeaturesSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, BookOpen, Clock, Code } from "lucide-react";

const advancedFeatures = [
  {
    icon: Upload,
    title: "Teacher-Centric Uploads",
    description: "Free, easy content sharing tailored to teachers' specialization, enabling rich and relevant resources",
  },
  {
    icon: BookOpen,
    title: "Student Learning Path",
    description: "Flexible enrollment with self-paced courses and certification to support personalized learning journeys",
  },
  {
    icon: Clock,
    title: "Smart Attendance",
    description: "Automated inactivity detection and skip prevention to ensure active participation and accountability",
  },
  {
    icon: Code,
    title: "Custom API System",
    description: "Robust, dependency-free architecture delivering seamless performance and integration",
  },
];

export default function AdvancedFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Empowering Teaching and Learning</h2>
          <p className="text-muted-foreground text-lg">
            Advanced Features
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Innovative tools designed to enhance engagement, accountability, and education quality
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advancedFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

