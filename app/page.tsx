import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Schools } from "@/components/schools";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import { Marquee } from "@/components/marquee";
import { PageLoader } from "@/components/page-loader";

export default function Home() {
  return (
    <>
      <Grain />
      <PageLoader />
      <main className="mx-auto max-w-[1440px] w-full overflow-x-hidden break-normal">
        <Cursor />
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Marquee />
        <Schools />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
