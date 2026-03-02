import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Schools } from "@/components/schools";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12 break-normal">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Schools />
      <Skills />
      <Contact />
    </main>
  );
}
