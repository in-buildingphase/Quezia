import Hero from "../layout/hero";
import Navbar from "../layout/navbar";
import Cards from "../ui/cards";
import About from "../layout/about";
import Footer from "../layout/footer";

export default function Home() {
  return (
    <main className="text-[#E0E0E0]">
      <Navbar />
      <Hero />
      <About />
      <Cards />
      <Footer />
    </main>
  );
}
