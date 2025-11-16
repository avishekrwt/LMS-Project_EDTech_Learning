import { Button } from "@/components/ui/button";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-background via-accent/20 to-background transition-colors duration-500">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/10 pointer-events-none"></div>

      <div className="relative container mx-auto flex flex-row items-center justify-between gap-8 flex-nowrap">
        {/* LEFT SIDE: Text section (unchanged position) */}
        <div className="flex-shrink-0 text-left w-[45%] min-w-[260px]">
          <h1
            className="font-extrabold leading-tight mb-6 text-foreground"
            style={{
              fontSize: "clamp(28px, 6.5vw, 56px)",
              lineHeight: 1.03,
            }}
          >
            Empowering Teachers and Students with{" "}
            <span
              className="block text-primary"
              style={{ fontSize: "clamp(28px, 6.5vw, 56px)" }}
            >
              Free Technical Learning
            </span>
          </h1>

          <p
            className="text-muted-foreground mb-8"
            style={{ fontSize: "clamp(14px, 1.8vw, 18px)", maxWidth: 480 }}
          >
            Building an inclusive, teacher-driven platform for authentic,
            accessible education.
          </p>

          <Button size="lg" className="px-8 py-4 font-semibold w-max">Get Started</Button>
        </div>

        {/* RIGHT SIDE: Enlarged image */}
        <div className="flex-shrink-0 flex justify-end w-[55%]">
          <div
            className="relative"
            style={{
              width: "clamp(400px, 60vw, 950px)", // scaled up from 850px
              transform: "scale(1.1)", // scale up image a bit more
              transformOrigin: "center right", // keep scaling to the right side
            }}
          >
            <img
              src="/heroSection_bg.png"
              alt="Hero Illustration"
              className="object-contain w-full h-auto"
              style={{
                display: "block",
                filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.08))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
