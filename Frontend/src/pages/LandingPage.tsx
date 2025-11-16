// src/pages/LandingPage.tsx
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
// Removed duplicates: EmpoweringTeachersSection and SmartAttendanceSection
import FeaturesSection from "@/components/sections/FeaturesSection";
import TeacherCentricSection from "@/components/sections/TeacherCentricSection";
// Optional deep-dive sections kept out to streamline landing
import PlatformWorkflowSection from "@/components/sections/PlatformWorkflowSection";
import LearningJourneySection from "@/components/sections/LearningJourneySection";
// AdvancedFeatures merged into FeaturesSection
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PlatformWorkflowSection />
      <LearningJourneySection />
      <TeacherCentricSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
