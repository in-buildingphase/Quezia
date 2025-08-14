// components/Navbar.jsx
"use client"
import Link from "next/link"
import { useState } from "react"

// Reusable Button
const Button = ({ asChild, children, className, href = "#" }) => {
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
const HamburgerIcon = ({ isOpen }) => (
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
    { name: "Home", href: "#solutions" },
    { name: "Features", href: "#features" },
    { name: "Products", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="w-full px-4 sm:w-[90%] lg:w-3/4 mx-auto mt-4 sm:mt-6 relative z-30">
      <div className="flex items-center justify-between rounded-full border border-[#333] px-4 sm:px-6 lg:px-8 py-3 bg-[#1A1A1A]/80 backdrop-blur-md shadow-lg relative z-31">
        
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold text-[#FFB74D] tracking-tight hover:scale-105 transition-transform relative z-32"
        >
          Quezia
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#E0E0E0] text-sm hover:text-[#FFB74D] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* Desktop Buttons */}
          <Button
            asChild
            href="#"
            className="border border-[#FFB74D] text-[#FFB74D] hover:bg-[#FFB74D]/15 hover:scale-105"
          >
            <>
              <span className="inline-block w-2.5 h-2.5 bg-[#FFCC80] rounded" />
              Create Account
            </>
          </Button>

          <Button
            asChild
            href="#"
            className="bg-[#FF8F00] text-black hover:bg-[#FFA000] hover:scale-105 shadow-sm"
          >
            Log In
          </Button>
        </div>

        {/* Tablet Buttons (hidden on mobile, shown on tablet) */}
        <div className="hidden sm:flex lg:hidden items-center gap-3">
          <Button
            asChild
            href="#"
            className="border border-[#FFB74D] text-[#FFB74D] hover:bg-[#FFB74D]/15 hover:scale-105 text-xs px-4 py-2"
          >
            <>
              <span className="inline-block w-2 h-2 bg-[#FFCC80] rounded" />
              Create Account
            </>
          </Button>

          <Button
            asChild
            href="#"
            className="bg-[#FF8F00] text-black hover:bg-[#FFA000] hover:scale-105 shadow-sm text-xs px-4 py-2"
          >
            Log In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-32 p-2 rounded-full hover:bg-[#333]/50 transition-colors"
          aria-label="Toggle menu"
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Mobile Menu */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A]/95 backdrop-blur-md border border-[#333] rounded-2xl p-6 shadow-2xl z-40 lg:hidden">
              {/* Mobile Nav Links */}
              <div className="flex flex-col space-y-4 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-[#E0E0E0] text-base hover:text-[#FFB74D] transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-[#333]/30"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="flex flex-col sm:hidden space-y-3">
                <Link
                  href="#"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border border-[#FFB74D] text-[#FFB74D] hover:bg-[#FFB74D]/15 justify-center w-full"
                >
                  <span className="inline-block w-2.5 h-2.5 bg-[#FFCC80] rounded" />
                  Create Account
                </Link>

                <Link
                  href="#"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-[#FF8F00] text-black hover:bg-[#FFA000] shadow-sm justify-center w-full"
                >
                  Log In
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}