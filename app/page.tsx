// npm i prettier-plugin-tailwindcss@latest

import Pic from "../components/Pic";
import Main from "../components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Pic />
      <Main />
      <section id="technologies">
        <Technologies />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section className="w-full text-center py-10">
        <p className="text-white text-lg mb-3">Click here for:</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <a
            href="https://www.linkedin.com/in/suhaib1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300"
          >
            <Image
              src="/linkedin.png"
              width={500}
              height={172}
              alt="LinkedIn"
              className="w-14 h-10 " 
            />
          </a>
          <a
            href="https://github.com/MuhammedSuhaib"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300"
          >
            <Image
              src="/github.png"
              width={357}
              height={357}
              alt="GitHub"
              className="size-16 rounded-lg"
            />
          </a>
          <Link href="/About" className="px-4 py-2 bg-[#5c0442] text-white rounded-md">About Me</Link>
          <Link href="/co" className="px-4 py-2 bg-[#ff5100] text-white rounded-md ">Contact Me</Link>
        </div>
      </section>
    </>
  );
}
