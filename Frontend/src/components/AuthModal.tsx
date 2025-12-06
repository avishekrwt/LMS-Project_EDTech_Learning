import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUserStore } from "@/hooks/useUserStore";
import { api } from "@/services/api";

export default function AuthModal() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || "light";
  const { isOpen, mode, openSignIn, close } = useAuthModal();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [signInForm, setSignInForm] = useState({ email: "", password: "" });

  // Close modal on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const { user, session, profile } = await api.login(signInForm);
      setUser(
        { id: user.id, email: user.email },
        session.access_token,
        profile
          ? {
              firstName: profile.first_name,
              lastName: profile.last_name,
              avatarUrl: profile.avatar_url,
              role: profile.role,
              organization: profile.organization,
            }
          : undefined
      );

      close();
      setSignInForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal */}
      <div ref={modalRef} className="relative w-full max-w-md mx-auto">
        <Card className={`border-0 shadow-2xl rounded-2xl overflow-hidden ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white"}`}>
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <CardHeader className="space-y-2 pb-4 pt-6 relative">
            <button
              onClick={close}
              className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
                theme === "dark" 
                  ? "hover:bg-slate-800 text-gray-400 hover:text-white" 
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mb-2">
              <img src="/techzoneLogo.png" alt="TechZone Logo" className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-sm" />
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</CardTitle>
            <CardDescription className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Access your personalized learning experience</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold ml-0.5">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={signInForm.email} onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })} required className={`${theme === "dark" ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"} rounded-lg transition-all duration-300`} />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold ml-0.5">Password</Label>
                  <button type="button" onClick={() => { close(); navigate('/coming-soon'); }} className={`text-xs font-medium transition-colors ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>Forgot?</button>
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={signInForm.password} onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })} required className={`${theme === "dark" ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-10" : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-10"} rounded-lg transition-all duration-300`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-1">
                <input id="remember" type="checkbox" className={`rounded cursor-pointer accent-blue-600 ${theme === "dark" ? "border-slate-600 bg-slate-800" : "border-gray-300 bg-white"}`} />
                <Label htmlFor="remember" className="text-sm cursor-pointer font-normal">Keep me signed in</Label>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-md px-3 py-2">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center"><span className="animate-spin mr-2">⏳</span>Signing in...</span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={theme === "dark" ? "w-full border-t border-slate-700" : "w-full border-t border-gray-200"}></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-3 text-xs font-medium ${theme === "dark" ? "bg-slate-900 text-gray-400" : "bg-white text-gray-500"}`}>Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={() => { close(); navigate('/coming-soon'); }} className={`rounded-lg font-medium transition-all duration-200 ${theme === "dark" ? "border-slate-700 bg-slate-800 hover:bg-slate-700 text-white" : "border-gray-200 hover:bg-gray-50"}`}>
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>

              <Button type="button" variant="outline" onClick={() => { close(); navigate('/coming-soon'); }} className={`rounded-lg font-medium transition-all duration-200 ${theme === "dark" ? "border-slate-700 bg-slate-800 hover:bg-slate-700 text-white" : "border-gray-200 hover:bg-gray-50"}`}>
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Don't have an account?{' '}
                <button onClick={() => { close(); navigate('/signup'); }} className={`font-semibold transition-colors ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                  Create one
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}