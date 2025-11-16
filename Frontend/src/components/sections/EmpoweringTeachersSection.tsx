// src/components/sections/EmpoweringTeachersSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, GraduationCap, CheckCircle, Users } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy Content Upload",
    description: "Enable teachers to upload specialized content easily, without cost or technical barriers",
  },
  {
    icon: GraduationCap,
    title: "Self-Paced Learning",
    description: "Offer students self-paced learning paths with support from certified instructors",
  },
  {
    icon: CheckCircle,
    title: "Smart Tracking",
    description: "Ensure authenticity and engagement through smart attendance and completion tracking",
  },
  {
    icon: Users,
    title: "Community Growth",
    description: "Foster skill development, boost employability, and nurture a passionate tech education community",
  },
];

export default function EmpoweringTeachersSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Empowering Teachers and Students</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Building an inclusive, teacher-driven platform for authentic, accessible education
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
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

