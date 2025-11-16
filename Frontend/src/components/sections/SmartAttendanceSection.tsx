// src/components/sections/SmartAttendanceSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Video, Search, Settings } from "lucide-react";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "AFK Auto-Exit System",
    description: "Detects inactivity during live classes and removes idle participants automatically",
  },
  {
    icon: Video,
    title: "Skip-Detection System",
    description: "Monitors recorded lecture viewing to ensure full content engagement before certificate eligibility",
  },
  {
    icon: Search,
    title: "Engagement Standards",
    description: "Upholds engagement standards, reduces passive attendance, and improves learning outcomes",
  },
  {
    icon: Settings,
    title: "Administrative Efficiency",
    description: "Automation reduces administrative overhead and supports scalable course management",
  },
];

export default function SmartAttendanceSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Smart Attendance Features</h2>
          <p className="text-muted-foreground text-lg">
            Automated Engagement Monitoring
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Enhancing participation and scalability through intelligent automation
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
              {i < features.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

