import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  return (
  <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm w-full">
    <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo Only - Clean Left Side */}
        <Link 
          to="/" 
          className="flex items-center group flex-shrink-0" 
          aria-label="Go to homepage"
          onClick={() => setIsMenuOpen(false)}
        >
          <img 
            src="techzoneLogo.png" 
            alt="TechZone Logo" 
            className="h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 filter drop-shadow-sm" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-1">
          {!isLoggedIn ? (
            <>
              <NavLink to="/" currentPath={location.pathname}>Home</NavLink>

              {/* Courses Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative text-sm font-medium rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center">
                    Courses
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 mt-1 w-48 rounded-lg shadow-lg">
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">All Courses</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">By Department</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">Featured</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
              <NavLink to="/contact" currentPath={location.pathname}>Contact</NavLink>

              <Button size="sm" className="ml-2 px-4" onClick={() => setIsLoggedIn(true)}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" currentPath={location.pathname}>Dashboard</NavLink>
              <NavLink to="/my-courses" currentPath={location.pathname}>My Courses</NavLink>
              <NavLink to="/certificates" currentPath={location.pathname}>Certificates</NavLink>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 text-sm font-medium rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      <User size={16} />
                    </div>
                    <span>Profile</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 mt-1 w-48 rounded-lg shadow-lg">
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">My Account</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">Settings</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive"
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
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-1 px-4 pb-4 pt-2">
            {!isLoggedIn ? (
              <>
                <NavLink to="/" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/courses" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Courses
                </NavLink>
                <NavLink to="/about" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  About
                </NavLink>
                <NavLink to="/contact" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Contact
                </NavLink>
                <Button
                  onClick={() => {
                    setIsLoggedIn(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full mt-2"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/my-courses" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  My Courses
                </NavLink>
                <NavLink to="/certificates" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Certificates
                </NavLink>
                <NavLink to="/profile" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Profile
                </NavLink>
                <Button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsMenuOpen(false)
                  }}
                  variant="destructive"
                  className="w-full mt-2"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

/* Reusable Link Component with active state */
function NavLink({
  to,
  children,
  currentPath,
  mobile,
  onClick,
}: {
  to: string
  children: React.ReactNode
  currentPath?: string
  mobile?: boolean
  onClick?: () => void
}) {
  const isActive = currentPath === to
  const baseClasses = mobile
    ? "relative text-base font-medium w-full text-left rounded-lg px-3 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
    : "relative text-sm font-medium rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
  const activeClasses = isActive
    ? " text-primary bg-accent/80 font-semibold"
    : ""

  return (
    <Link 
      to={to} 
      onClick={onClick} 
      aria-current={isActive ? "page" : undefined} 
      className={`${baseClasses}${activeClasses}`}
    >
      {children}
    </Link>
  )
}