import Hero from "../layout/hero";
import Navbar from "../layout/navbar";
import Cards from "../ui/cards";
import About from "../layout/about";
import Features from "../layout/features";
import Footer from "../layout/footer";

export default function Home() {
  return (
    <main className="text-[#E0E0E0]">
      <Navbar />
      <Hero />
      {/* About and Features sections with shared background */}
      <div className="bg-gradient-to-b from-black to-[#0A0A0A] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF8F00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB74D]/8 rounded-full blur-3xl" />
        
        <About />
        <Features />
      </div>
      <Cards />
      <Footer />
    </main>
  );
}
