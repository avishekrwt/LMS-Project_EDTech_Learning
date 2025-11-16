// src/components/sections/CertificateMechanismSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, XCircle, Users, Briefcase } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Complete Attendance Required",
    description: "Certificates issued only after attending or completing all live and recorded classes",
  },
  {
    icon: XCircle,
    title: "Strict Policy",
    description: "Missing any live session or partial viewing of recordings results in certificate withholding",
  },
  {
    icon: Users,
    title: "Full Participation",
    description: "Policy promotes full participation, discourages skipping, and boosts knowledge retention",
  },
  {
    icon: Briefcase,
    title: "Verified Credibility",
    description: "Verified certificates enhance learner credibility and employer trust in a competitive job market",
  },
];

export default function CertificateMechanismSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Certificate Mechanism</h2>
          <p className="text-muted-foreground text-lg">
            Ensuring Commitment and Credibility
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Strict issuance policy fosters full engagement and trust
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

