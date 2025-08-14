// components/Navbar.jsx
"use client"
import Link from "next/link"

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

export default function Navbar() {
  return (
    <nav className="w-3/4 mx-auto mt-6">
      <div className="flex items-center justify-between rounded-full border border-[#333] px-8 py-3 bg-[#1A1A1A]/80 backdrop-blur-md shadow-lg">
        
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[#FFB74D] tracking-tight hover:scale-105 transition-transform"
        >
          Quezia
        </Link>

        {/* Right: Links + Buttons */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          {[
            { name: "Home", href: "#solutions" },
            { name: "Features", href: "#features" },
            { name: "Products", href: "#testimonials" },
            { name: "Pricing", href: "#pricing" },
            { name: "Contact", href: "#contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#E0E0E0] text-sm hover:text-[#FFB74D] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* Create Account Button */}
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

          {/* Get Started Button */}
          <Button
            asChild
            href="#"
            className="bg-[#FF8F00] text-black hover:bg-[#FFA000] hover:scale-105 shadow-sm"
          >
            Log In
          </Button>
        </div>
      </div>
    </nav>
  )
}
