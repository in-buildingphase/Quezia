// components/Navbar.jsx
"use client"
import Link from "next/link"
import { useState } from "react"

// Reusable Button
interface ButtonProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Button = ({ asChild, children, className, href = "#" }: ButtonProps) => {
  const Comp = asChild ? Link : "button"
  return (
    <Comp
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </Comp>
  )
}

// Hamburger Menu Icon
interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon = ({ isOpen }: HamburgerIconProps) => (
  <div className="flex flex-col justify-center items-center w-6 h-6">
    <span
      className={`bg-[#E0E0E0] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
      }`}
    />
    <span
      className={`bg-[#E0E0E0] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`bg-[#E0E0E0] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
      }`}
    />
  </div>
)

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const navbarHeight = 100 // Account for fixed navbar height
      const elementPosition = targetElement.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu()
    }
  }

  return (
    <>
      {/* Fixed Glass Navbar - Just the pill */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[75%] animate-nav-slide-down">
        {/* Glass pill container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-full border border-white/20 shadow-xl px-6 py-3" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
          {/* Navigation content */}
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-[#FFB74D] tracking-tight hover:scale-105 transition-transform"
            >
              Quezia
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Nav Links */}
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-white/90 text-sm font-medium hover:text-[#FFB74D] transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Desktop Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  href="#"
                  className="border border-[#FFB74D]/50 text-[#FFB74D] hover:bg-[#FFB74D]/20 hover:border-[#FFB74D]"
                >
                  <>
                    <span className="inline-block w-2 h-2 bg-[#FFCC80] rounded-full" />
                    Create Account
                  </>
                </Button>

                <Button
                  asChild
                  href="#"
                  className="bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black hover:from-[#FFA000] hover:to-[#FFB74D] shadow-lg"
                >
                  Log In
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full animate-slide-down">
            <div className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
              {/* Mobile Nav Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="block text-white/90 text-base font-medium py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[#FFB74D] transition-all duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3">
                <Link
                  href="#"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium rounded-full border border-[#FFB74D]/50 text-[#FFB74D] hover:bg-[#FFB74D]/20 transition-all duration-300"
                >
                  <span className="inline-block w-2 h-2 bg-[#FFCC80] rounded-full" />
                  Create Account
                </Link>

                <Link
                  href="#"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black hover:from-[#FFA000] hover:to-[#FFB74D] shadow-lg transition-all duration-300"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}