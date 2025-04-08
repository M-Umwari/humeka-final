import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from './components/Home'
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import OurTeam from "./components/OurTeam";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header/>
      <HomeSection/>
      <About/>
      <Services/>
      <Testimonials/>
      <OurTeam/>
      <Footer/>
    </div>
  );
}
