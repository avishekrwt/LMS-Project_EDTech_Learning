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
import DashboardPage from "@/pages/DashboardPage";
import MyCoursesPage from "@/pages/MyCoursesPage";
import MyCertificatesPage from "@/pages/MyCertificatesPage";
import MyAccountPage from "@/pages/MyAccountPage";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/ProtectedRoute";


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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <MyCertificatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
