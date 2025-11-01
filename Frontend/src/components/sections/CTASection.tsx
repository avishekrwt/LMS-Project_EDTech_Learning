// src/components/sections/CTASection.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="text-center py-20 bg-gradient-to-r from-primary/10 to-primary/30 dark:from-primary/20 dark:to-primary/40"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-4"
      >
        Ready to Elevate Your Learning Platform?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8"
      >
        Start your free trial today — experience the full power of EDTech LMS.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button size="lg" className="text-lg px-8 py-6">
          Get Started Now
        </Button>
      </motion.div>
    </section>
  );
}
