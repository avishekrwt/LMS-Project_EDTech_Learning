import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/logo.svg" alt="EDTech Logo" className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
            EDTech LMS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!isLoggedIn ? (
            <>
              <NavLink to="/">Home</NavLink>

              {/* Courses Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="font-medium relative hover:text-primary transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all">
                    Courses
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 mt-2 w-48">
                  <DropdownMenuItem>All Courses</DropdownMenuItem>
                  <DropdownMenuItem>By Department</DropdownMenuItem>
                  <DropdownMenuItem>Featured</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>

              <Button size="sm" onClick={() => setIsLoggedIn(true)}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/my-courses">My Courses</NavLink>
              <NavLink to="/assignments">Assignments</NavLink>
              <NavLink to="/grades">Grades</NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 font-medium hover:text-primary transition-colors">
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 mt-2 w-40">
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Theme Toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={22} />
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start space-y-3 px-6 pb-4 border-t border-border bg-background animate-slideDown">
          {!isLoggedIn ? (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/courses">Courses</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <Button
                onClick={() => setIsLoggedIn(true)}
                className="w-full mt-2"
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/my-courses">My Courses</NavLink>
              <NavLink to="/assignments">Assignments</NavLink>
              <NavLink to="/grades">Grades</NavLink>
              <Button
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </>
          )}

          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}

/* Reusable Link Component */
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
    >
      {children}
    </Link>
  )
}
