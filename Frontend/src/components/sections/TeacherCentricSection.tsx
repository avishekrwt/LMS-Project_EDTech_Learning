// src/components/sections/TeacherCentricSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Calendar, Laptop, Award, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Intuitive Interface",
    description: "Intuitive upload interface supports multiple formats without technical skills",
  },
  {
    icon: Calendar,
    title: "Full Control",
    description: "Maintain full control over your content and teaching schedule",
  },
  {
    icon: Laptop,
    title: "Global Reach",
    description: "Contribute quality materials and reach a global student audience",
  },
  {
    icon: Award,
    title: "Teacher-Driven Ecosystem",
    description: "Foster a teacher-driven ecosystem that expands diverse learning aligned to industry needs",
  },
  {
    icon: ThumbsUp,
    title: "Free Upload",
    description: "Upload video lectures, notes, and supplementary resources for free",
  },
];

export default function TeacherCentricSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Teacher-Centric Uploads</h2>
          <p className="text-muted-foreground text-lg">
            Empower Educators to Share Expertise
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Seamlessly upload diverse content and control your teaching impact globally
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
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

