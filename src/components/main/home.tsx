import Hero from "../layout/hero";
import Navbar from "../layout/navbar";
import Cards from "../ui/cards";
import Verticaldock from "../ui/verticaldock";
import About from "../layout/about";

export default function Home() {
  return (
    <main className="text-[#E0E0E0]">
      <Navbar />
      <Verticaldock />
      <Hero />
      <About />
      <Cards />
    </main>
  );
}
