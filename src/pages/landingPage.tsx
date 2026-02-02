import Hero from '../components/landingpage/hero';
import Navbar from '../components/landingpage/navbar';
import About from '../components/landingpage/about';
import Features from '../components/landingpage/features';
import Pricing from '../components/landingpage/pricing';
import Footer from '../components/landingpage/footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
	  <Features />
	  <Pricing/>
	  <Footer/>
    </div>
  );
};

export default LandingPage;
