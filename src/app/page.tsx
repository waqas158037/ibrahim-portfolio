import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Timeline } from "@/components/sections/Timeline";
import { Results } from "@/components/sections/Results";
import { WhyMe } from "@/components/sections/WhyMe";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Positioning />
        <About />
        <Services />
        <Skills />
        <Work />
        <Process />
        <Timeline />
        <Results />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
