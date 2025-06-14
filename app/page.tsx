// npm i prettier-plugin-tailwindcss@latest

import Pic from "../components/Pic";
import Main from "../components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Link from "next/link";
import { Github, Linkedin, Mailbox, ScrollText } from "lucide-react";

export default function Home() {
  return (
    <>
      <Pic />
      <Main />
      <section id="technologies" className="flex justify-center items-center">
        <Technologies />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section className="w-full text-center py-10">
        <p className="text-white text-lg mb-3">Click here for:</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <a href="https://github.com/MuhammedSuhaib" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="flex flex-col items-center text-white">
            <Github className="size-10" />
            <span>GitHub Profile</span>
          </a>
          <a href="https://www.linkedin.com/in/suhaib1/" target="_blank" rel="noopener noreferrer" title="Linkedin Profile" className="flex flex-col items-center text-white">
            <Linkedin className="size-10" />
            <span>Linkedin Profile</span>
          </a>
          <Link href="/co" className="flex flex-col items-center text-white">
            <Mailbox className="size-10" />
            <span>Contact Me</span>
          </Link>
          <Link href="/About" className="flex flex-col items-center text-white">
            <ScrollText className="size-10" />
            <span>About Me</span>
          </Link>
        </div>
      </section>
    </>
  );
} 
