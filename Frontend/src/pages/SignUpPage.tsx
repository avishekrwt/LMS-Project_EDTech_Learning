import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { url } from "inspector";

export default function NewSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-background via-accent/10 to-background p-4 md:p-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8 pointer-events-none"></div>

      <div className="relative w-full max-w-6xl h-full grid grid-cols-1 lg:grid-cols-2 bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        {/* Left Panel */}
        <div
          className="hidden lg:flex flex-col justify-center p-16 text-white"
          style={{
            backgroundImage: 'url(`https://images.unsplash.com/photo-1553307236-8783cc0a3b9e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            background: "linear-gradient(135deg, hsl(147, 50%, 62%) 0%, hsl(203, 72%, 52%) 100%)"
          }}
        >
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome</h1>
          <p className="text-lg leading-relaxed drop-shadow-md max-w-md">
            Join our learning community and unlock your potential with our comprehensive educational platform.
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="p-5 md:p-9 bg-card flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-3 text-foreground">Register</h2>
          <p className="mb-8 text-muted-foreground text-base">Create your account. It's free and takes a minute.</p>

          <form className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-border rounded-lg p-3 w-full bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-border rounded-lg p-3 w-full bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="border border-border rounded-lg p-3 w-full bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="at least 8 characters"
                  className="border border-border rounded-lg p-3 w-full pr-12 bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="same as above"
                  className="border border-border rounded-lg p-3 w-full pr-12 bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start space-x-3 text-foreground text-sm cursor-pointer hover:text-primary transition-colors">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border cursor-pointer" />
              <span>
                I accept the <a href="#" className="text-primary font-medium hover:underline">Terms of Use</a> &
                <a href="#" className="text-primary font-medium hover:underline"> Privacy Policy</a>
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold shadow-lg transition-all hover:shadow-xl mt-8"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
