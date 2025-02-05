// npm i prettier-plugin-tailwindcss@latest

import Pic from "../components/Pic";
import Main from "../components/Hero";
import Header from "@/components/Header";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
export default function Home() {
  return (
    <div className="duration-10000 size-full bg-gradient-to-b from-black to-[#26045c] transition-all hover:bg-gradient-to-br hover:from-[#32027e] hover:to-black">
    <Header />
    <Pic />
    <Main />
    <section id="technologies">
      <Technologies />
    </section>
    <section id="projects">
      <Projects />
    </section>
  </div>
  );
}
