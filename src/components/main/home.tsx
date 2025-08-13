import Hero from "../layout/hero";
import Navbar from "../layout/navbar";

export default function Home() {
  return (
    <main className="w-full bg-[#121212] text-[#E0E0E0]">
      <Navbar />
      <Hero />
    </main>
  );
}
