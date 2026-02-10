import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Slight threshold for better feel
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 w-full z-50 px-8 py-4 
        transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-white/100 shadow-md backdrop-blur-none' 
          : 'bg-white/20 backdrop-blur-md shadow-none'
        }
      `}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side - Logo/Brand */}
        <div 
          className={`
            text-2xl font-bold transition-colors duration-500
            ${isScrolled ? 'text-gray-800' : 'text-white'}
          `}
        >
          Quezia
        </div>

        {/* Middle - Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Reviews', 'Pricing', 'Contact Us'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`
                transition-all duration-500 hover:scale-105
                ${isScrolled 
                  ? 'text-gray-600 hover:text-gray-900' 
                  : 'text-white/90 hover:text-white'}
              `}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side - CTA Buttons */}
        <div className="flex space-x-4 items-center">
          <Link 
            to="/auth?mode=login" 
            className={`
              px-4 py-2 rounded-lg transition-all duration-500 hover:scale-105
              ${isScrolled 
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                : 'text-white/90 hover:text-white hover:bg-white/10'}
            `}
          >
            Sign In
          </Link>
          <Link 
            to="/auth?mode=register" 
            className={`
              px-6 py-2 rounded-lg font-medium transition-all duration-500 hover:scale-105
              ${isScrolled 
                ? 'bg-[#EC2801] text-white shadow-lg hover:bg-[#d12300] hover:shadow-xl' 
                : 'bg-white text-[#EC2801] hover:bg-white/90 hover:shadow-lg'}
            `}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;