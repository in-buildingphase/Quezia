// components/Navbar.jsx
"use client"
import Link from "next/link"

// Reusable Button
const Button = ({ asChild, children, className }) => {
  const Comp = asChild ? Link : "button"
  return (
    <Comp
      href="#"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition ${className}`}
    >
      {children}
    </Comp>
  )
}

export default function Navbar() {
  return (
    <nav className="w-3/4 mx-auto mt-6">
      <div className="flex items-center justify-between rounded-full bg-[#1A1A1A] border border-[#333] px-6 py-3">
        
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold text-[#FFB74D] tracking-tight">
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
              className="text-[#E0E0E0] text-sm hover:text-[#FFB74D] transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Create Account Button */}
          <Button
            asChild
            className="border border-[#FFB74D] text-[#FFB74D] hover:bg-[#FFB74D]/10"
          >
            <>
              <span className="inline-block w-3 h-3 bg-[#FFCC80] rounded" />
              Create Account
            </>
          </Button>

          {/* Get Started Button */}
          <Button
            asChild
            className="bg-[#FF8F00] text-black hover:bg-[#FFA000]"
          >
            Log In
          </Button>
        </div>
      </div>
    </nav>
  )
}
