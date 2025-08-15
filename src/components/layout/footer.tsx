import { Mail, Phone, MapPin, ExternalLink, Facebook, X, Instagram, Linkedin, Youtube } from "lucide-react";
import { GoldenText } from "../ui/goldentext";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#0A0A0A] to-black border-t border-[#333] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FF8F00]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#FFD54F]/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* App Info Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                <GoldenText>Quezia</GoldenText>
              </h3>
              <p className="text-[#B0B0B0] text-sm leading-relaxed">
                Revolutionizing exam preparation with AI-powered learning solutions. Master your exams with comprehensive past papers and intelligent practice tests.
              </p>
            </div>
            
            {/* App Store Badges */}
            <div className="space-y-3">
              <p className="text-[#888] text-xs font-medium">Download Our App</p>
              <div className="flex flex-col space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#FF8F00]/30 transition-colors cursor-pointer w-fit">
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-black text-xs font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Download on the</p>
                    <p className="text-white text-sm font-bold">App Store</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#FF8F00]/30 transition-colors cursor-pointer w-fit">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Get it on</p>
                    <p className="text-white text-sm font-bold">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FF8F00] mt-0.5" />
                <div>
                  <p className="text-[#888] text-xs">Email</p>
                  <a href="mailto:hello@quezia.com" className="text-white text-sm hover:text-[#FF8F00] transition-colors">
                    hello@quezia.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FF8F00] mt-0.5" />
                <div>
                  <p className="text-[#888] text-xs">Phone</p>
                  <a href="tel:+1234567890" className="text-white text-sm hover:text-[#FF8F00] transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF8F00] mt-0.5" />
                <div>
                  <p className="text-[#888] text-xs">Address</p>
                  <p className="text-white text-sm">
                    123 Education Street<br />
                    Learning City, LC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-3">
              {[
                'About Us',
                'Features',
                'Pricing',
                'Past Papers',
                'Practice Tests',
                'Help Center',
                'Privacy Policy',
                'Terms of Service'
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[#B0B0B0] text-sm hover:text-[#FF8F00] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            
            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-[#888] text-xs">Follow us on social media</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1A1A1A] border border-[#333] hover:border-blue-600 rounded-lg flex items-center justify-center text-[#888] hover:text-blue-600 transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1A1A1A] border border-[#333] hover:border-gray-400 rounded-lg flex items-center justify-center text-[#888] hover:text-white transition-all hover:scale-110"
                  aria-label="X (formerly Twitter)"
                >
                  <X className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1A1A1A] border border-[#333] hover:border-pink-500 rounded-lg flex items-center justify-center text-[#888] hover:text-pink-500 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1A1A1A] border border-[#333] hover:border-blue-700 rounded-lg flex items-center justify-center text-[#888] hover:text-blue-700 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1A1A1A] border border-[#333] hover:border-red-600 rounded-lg flex items-center justify-center text-[#888] hover:text-red-600 transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-[#888] text-xs">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm placeholder-[#666] focus:border-[#FF8F00] focus:outline-none transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB300] text-white text-sm font-medium rounded-lg transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#333] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#888] text-sm text-center md:text-left">
              © {currentYear} Quezia. All rights reserved. Made with ❤️ for students worldwide.
            </div>
            <div className="flex items-center gap-6 text-[#888] text-sm">
              <a href="#" className="hover:text-[#FF8F00] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#FF8F00] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#FF8F00] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
