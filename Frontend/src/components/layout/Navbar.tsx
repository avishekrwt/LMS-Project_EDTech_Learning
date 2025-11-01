// src/components/layout/Navbar.tsx
import ThemeToggle from "../ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-primary">EDTech</h1>
      <div className="flex items-center gap-4">
        <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
        <a href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</a>
        <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
        <Button>Sign In</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
