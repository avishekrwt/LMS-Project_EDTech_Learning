// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/AuthModal";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CoursesPage from "@/pages/CoursesPage";
import SignUpPage from "@/pages/SignUpPage";
import ComingSoonPage from "@/pages/ComingSoonPage";


function App() {
  return (
    <>
      <Navbar />
      <AuthModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
       
      </Routes>
    </>
  );
}

export default App;
