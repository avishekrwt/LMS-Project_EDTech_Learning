import { useState, useEffect, useRef } from "react"
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
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false)
  const [coursesDropdownClicked, setCoursesDropdownClicked] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const location = useLocation()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const lastScrollYRef = useRef(0)
  const coursesDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile scroll detection for auto-hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only apply on mobile (check window width)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
          // Scrolling down
          setIsNavbarVisible(false)
        } else if (currentScrollY < lastScrollYRef.current) {
          // Scrolling up
          setIsNavbarVisible(true)
        }
      } else {
        // Always show on desktop
        setIsNavbarVisible(true)
      }
      
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile menu click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Cleanup courses dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (coursesDropdownTimeoutRef.current) {
        clearTimeout(coursesDropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
  <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm w-full transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
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
            className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 filter drop-shadow-sm" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-1">
          {!isLoggedIn ? (
            <>
              <NavLink to="/" currentPath={location.pathname}>Home</NavLink>

              {/* Courses Dropdown */}
              <div
                onMouseEnter={() => {
                  if (coursesDropdownTimeoutRef.current) {
                    clearTimeout(coursesDropdownTimeoutRef.current)
                    coursesDropdownTimeoutRef.current = null
                  }
                  if (!coursesDropdownClicked) {
                    setCoursesDropdownOpen(true)
                  }
                }}
                onMouseLeave={() => {
                  if (!coursesDropdownClicked) {
                    coursesDropdownTimeoutRef.current = setTimeout(() => {
                      setCoursesDropdownOpen(false)
                    }, 150)
                  }
                }}
              >
                <DropdownMenu
                  open={coursesDropdownOpen}
                  onOpenChange={(open) => {
                    if (coursesDropdownTimeoutRef.current) {
                      clearTimeout(coursesDropdownTimeoutRef.current)
                      coursesDropdownTimeoutRef.current = null
                    }
                    setCoursesDropdownOpen(open)
                    if (!open) {
                      setCoursesDropdownClicked(false)
                    }
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={() => {
                        if (coursesDropdownTimeoutRef.current) {
                          clearTimeout(coursesDropdownTimeoutRef.current)
                          coursesDropdownTimeoutRef.current = null
                        }
                        setCoursesDropdownClicked(true)
                        setCoursesDropdownOpen(true)
                      }}
                      className="relative text-sm font-medium rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center"
                    >
                      Courses
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="z-50 mt-1 w-48 rounded-lg shadow-lg"
                    onMouseEnter={() => {
                      if (coursesDropdownTimeoutRef.current) {
                        clearTimeout(coursesDropdownTimeoutRef.current)
                        coursesDropdownTimeoutRef.current = null
                      }
                    }}
                    onMouseLeave={() => {
                      if (!coursesDropdownClicked) {
                        coursesDropdownTimeoutRef.current = setTimeout(() => {
                          setCoursesDropdownOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <DropdownMenuItem className="p-0">
                      <Link to="/courses" className="block w-full px-3 py-2">All Courses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                      <Link to="/courses" className="block w-full px-3 py-2">By Department</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                      <Link to="/courses" className="block w-full px-3 py-2">Featured</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

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
            ref={mobileMenuButtonRef}
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
        <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-1 px-4 pb-4 pt-2">
            {!isLoggedIn ? (
              <>
                <NavLink to="/" currentPath={location.pathname} mobile onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
                <button
                  className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-between"
                  aria-expanded={mobileCoursesOpen}
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                >
                  Courses
                  <svg className={`h-4 w-4 transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileCoursesOpen && (
                  <div className="ml-4 space-y-1">
                    <Link
                      to="/courses"
                      onClick={() => setIsMenuOpen(false)}
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-accent block"
                    >
                      All Courses
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setIsMenuOpen(false)}
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-accent block"
                    >
                      By Department
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setIsMenuOpen(false)}
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-accent block"
                    >
                      Featured
                    </Link>
                  </div>
                )}
                
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
                <button
                  className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-between"
                  aria-expanded={mobileProfileOpen}
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      <User size={16} />
                    </div>
                    <span>Profile</span>
                  </div>
                  <svg className={`h-4 w-4 transition-transform ${mobileProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileProfileOpen && (
                  <div className="ml-4 space-y-1">
                    <button
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </button>
                    <button
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false)
                        setIsMenuOpen(false)
                      }}
                      className="relative text-base font-medium w-full text-left rounded-lg px-3 py-2 hover:bg-destructive/10 text-destructive"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
