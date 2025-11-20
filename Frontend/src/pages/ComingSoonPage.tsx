import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { ArrowLeft, Zap, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || "light";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === "dark" ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
      {/* Navigation Bar Spacing */}
      <div className="mt-16" />

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={`p-6 rounded-full ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
            <Zap className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className={`text-5xl md:text-6xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Coming Soon!
          </h1>
          <p className={`text-xl md:text-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            This feature is currently under development
          </p>
        </div>

        {/* Description */}
        <div className={`p-6 rounded-2xl ${theme === "dark" ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            We're working hard to bring you this amazing feature. It will be available in our next update with enhanced functionality and improved user experience.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Fast & Reliable</h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Optimized for performance</p>
          </div>

          <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Coming Updates</h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Exciting new features ahead</p>
          </div>

          <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <Bell className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Stay Tuned</h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Subscribe for updates</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-slate-900"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Return Home
          </Button>
        </div>

        {/* Additional Message */}
        <div className={`pt-8 border-t ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Thank you for your patience! Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
