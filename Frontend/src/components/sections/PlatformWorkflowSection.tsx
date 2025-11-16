// src/components/sections/PlatformWorkflowSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Megaphone, Video, ClipboardCheck, Award } from "lucide-react";
import { ArrowRight } from "lucide-react";

const workflowSteps = [
  {
    icon: Upload,
    title: "Teacher Upload",
    description: "Teachers upload specialized content via an intuitive portal",
  },
  {
    icon: Megaphone,
    title: "Student Enrollment",
    description: "Students browse courses and enroll, following personalized learning paths",
  },
  {
    icon: Video,
    title: "Live & Recorded Classes",
    description: "Live sessions include smart attendance; recorded lectures track full viewing",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Verification",
    description: "Attendance is monitored automatically during live sessions",
  },
  {
    icon: Award,
    title: "Certificate Issuance",
    description: "Certificates are automatically issued upon course completion and meeting all conditions",
  },
];

export default function PlatformWorkflowSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Platform Workflow</h2>
          <p className="text-muted-foreground text-lg">
            Seamless Teacher-Student Interaction
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Streamlined steps ensure engagement, quality delivery, and verified learning outcomes
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 rounded-full bg-primary/10 mb-4 relative z-10">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow between steps on desktop */}
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

