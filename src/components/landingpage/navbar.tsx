import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 px-8 py-4 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/20 backdrop-blur-sm'}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side - Logo/Brand */}
        <div className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
          Quezia
        </div>

        {/* Middle - Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className={`transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            Home
          </a>
          <a href="#about" className={`transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            About
          </a>
          <a href="#reviews" className={`transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            Reviews
          </a>
          <a href="#pricing" className={`transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            Pricing
          </a>
          <a href="#contact" className={`transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            Contact Us
          </a>
        </div>

        {/* Right side - CTA Buttons */}
        <div className="flex space-x-4">
          <button className={`px-4 py-2 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
            Sign In
          </button>
          <button className={`px-6 py-2 rounded-lg transition-colors ${isScrolled ? 'bg-[#EC2801] text-white hover:bg-[#EC2801]/90' : 'bg-[#EC2801]/0 text-white hover:bg-[#EC2801]/30'}`}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
