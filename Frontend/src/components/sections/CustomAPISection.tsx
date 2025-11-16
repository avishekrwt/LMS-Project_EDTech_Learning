// src/components/sections/CustomAPISection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Reliability",
    description: "Ensures stable, fault-tolerant operation by avoiding outdated dependencies and enabling consistent real-time updates",
  },
  {
    icon: Zap,
    title: "Modern Independence",
    description: "Internal API development avoids external bottlenecks, ensuring agility to adopt new technologies and deliver smooth user experiences",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Supports effortless growth by simplifying backend and frontend integration for expanding feature sets and user base",
  },
];

export default function CustomAPISection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Custom API System</h2>
          <p className="text-muted-foreground text-lg">
            Reliable, Modern, and Scalable Architecture
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Internal API control drives agility, security, and seamless integration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-5 rounded-full bg-primary/10 mb-6">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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

