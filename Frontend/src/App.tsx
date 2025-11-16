// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CoursesPage from "@/pages/CoursesPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </>
  );
}

export default App;
