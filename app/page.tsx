import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import StackSection from "@/components/StackSection";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <StackSection />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
