// src/components/sections/Footer.tsx
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background/90">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-primary">TechZone</h3>
          <p className="text-muted-foreground text-sm">
            Empowering education through technology.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:contact@edtech.com" className="hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} TechZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
