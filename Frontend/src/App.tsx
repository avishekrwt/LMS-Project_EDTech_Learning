// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/AuthModal";
import SessionManager from "@/components/SessionManager";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CoursesPage from "@/pages/CoursesPage";
import Course1 from "@/pages/courses/Course1";
import Course2 from "@/pages/courses/Course2";
import Course3 from "@/pages/courses/Course3";
import Course4 from "@/pages/courses/Course4";
import Course5 from "@/pages/courses/Course5";
import Course6 from "@/pages/courses/Course6";
import Course7 from "@/pages/courses/Course7";
import Course8 from "@/pages/courses/Course8";
import Course9 from "@/pages/courses/Course9";
import Course10 from "@/pages/courses/Course10";
import Course11 from "@/pages/courses/Course11";
import Course12 from "@/pages/courses/Course12";
import Course13 from "@/pages/courses/Course13";
import Course14 from "@/pages/courses/Course14";
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
      <SessionManager />
      <Navbar />
      <AuthModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/1" element={<Course1 />} />
        <Route path="/courses/2" element={<Course2 />} />
        <Route path="/courses/3" element={<Course3 />} />
        <Route path="/courses/4" element={<Course4 />} />
        <Route path="/courses/5" element={<Course5 />} />
        <Route path="/courses/6" element={<Course6 />} />
        <Route path="/courses/7" element={<Course7 />} />
        <Route path="/courses/8" element={<Course8 />} />
        <Route path="/courses/9" element={<Course9 />} />
        <Route path="/courses/10" element={<Course10 />} />
        <Route path="/courses/11" element={<Course11 />} />
        <Route path="/courses/12" element={<Course12 />} />
        <Route path="/courses/13" element={<Course13 />} />
        <Route path="/courses/14" element={<Course14 />} />
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
