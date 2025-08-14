import Hero from "../layout/hero";
import Navbar from "../layout/navbar";
import Cards from "../ui/cards";

export default function Home() {
  return (
    <main className="text-[#E0E0E0]">
      <Navbar />
      <Hero />
      <Cards />
    </main>
  );
}
