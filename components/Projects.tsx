import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Merienda } from "next/font/google";
const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

const projects = [
  { link: `https://muhammedsuhaibhackathon2.vercel.app/`, title: "E-commerce Website", description: "A full-stack e-commerce platform built with Next.js and Tailwind CSS.", image: "/Hekto.png" },
  { link: `https://hackathon-milestone-3-4-5-alpha.vercel.app/`, title: "Interactive Resume Builder", description: "A resume builder with interactive features using pure HTML and CSS.", image: "/resume.jpg" },
  { link: `https://muhammedsuhaibhackathon2.vercel.app/`, title: "Pixel-Perfect E-commerce Clone", description: "A precise, pixel-perfect recreation of an e-commerce website.", image: "/px.jpeg" },
  { link: `https://pana-cloud-sepia.vercel.app/`, title: "Panacloud Website", description: "A static website built with HTML and CSS.", image: "/pc.jpeg" },
  { link: `https://q2-assi8.vercel.app/`, title: "Next.js & Sanity Project", description: "Exploring Sanity as a headless CMS with Next.js and Tailwind.", image: "/Sanity.png" },
  { link: `https://my-app-data-fetching.vercel.app/`, title: "API Data Fetching Project", description: "Fetching and displaying API data in a Next.js project.", image: "/get.png" },
  { link: `https://mob-responsive.vercel.app/`, title: "Educational Website Clone", description: "A cloned educational website built with Next.js and Tailwind CSS.", image: "/edu.png" },
  { link: `https://github.com/MuhammedSuhaib/1stfigmaClone.git`, title: "Jewelry Website Clone", description: "A pixel-perfect Figma-based jewelry website clone.", image: "/clone-img.webp" },
  { link: `https://tailwind-css-phi-woad.vercel.app/`, title: "Space Exploration Landing Page", description: "A Next.js landing page showcasing space exploration.", image: "/space.jpg" },
  { link: `https://my-1st-responsive-site.vercel.app/`, title: "Next.js Landing Page", description: "A landing page built with Next.js and pure CSS modules.", image: "/resp.jpg" },
  { link: `https://next-js-page-routing.vercel.app/`, title: "Next.js Hot Reload Demo", description: "A project demonstrating Next.js Hot Reload feature.", image: "/hotReload.png" },
  { link: `https://hackathon-milestone-1-2-three.vercel.app/`, title: "static Resume Builder", description: "A static resume  using pure HTML and CSS.", image: "/plain.png" },
  { link: `https://www.linkedin.com/posts/suhaib1_activity-7238076836780343296-H6YC?utm_source=social_share_send&utm_medium=member_desktop_web`, title: "CLI Ghost Image", description: "Displays a ghost image in the terminal using Chalk and animations.", image: "/ghoost.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Fast-Quiz`, title: "CLI Quiz App", description: "A CLI-based quiz app built with TypeScript, Inquirer, and Chalk.", image: "/Quiz.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Adventure-game`, title: "CLI Adventure Game", description: "A text-based adventure game created with TypeScript and CLI libraries.", image: "/g.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Student-Management-System`, title: "CLI Student Management System", description: "A CLI-based student management system built with TypeScript.", image: "/Std.jpg" },
  { link: `https://github.com/MuhammedSuhaib/TODOS`, title: "CLI To-Do App", description: "A simple CLI to-do list application using TypeScript and Inquirer.", image: "/todos.jpg" },
  { link: `https://github.com/MuhammedSuhaib/ATM`, title: "CLI ATM Simulator", description: "A command-line ATM simulation built with TypeScript.", image: "/atm.jpg" },
  { link: `https://github.com/MuhammedSuhaib/currency_converter`, title: "CLI Currency Converter", description: "A CLI app for converting currencies using TypeScript.", image: "/crr.jpg" },
  { link: `https://github.com/MuhammedSuhaib/word_counter.git`, title: "CLI Word Counter", description: "A word-counting tool built for the terminal.", image: "/w.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Guess-the-Number-Game`, title: "CLI Number Guessing Game", description: "A CLI game where users guess a number.", image: "/guess.jpg" },
  { link: `https://github.com/MuhammedSuhaib/smple_calculator`, title: "CLI Calculator", description: "A simple command-line calculator using TypeScript.", image: "/Simple.jpg" },
  { link: `https://github.com/MuhammedSuhaib/45-taks.git`, title: "Node.js TypeScript Tasks", description: "A collection of 45 TypeScript tasks built with Node.js.", image: "/45.png" },
];

function Projects() {
  return (
    <div id="pro" className="flex flex-col items-center justify-center gap-6 py-10 px-6">
      <h1 className={`${merienda.className} mt-6 pb-16 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text text-6xl text-transparent`}>
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <a href={project.link} target="_blank" rel="noopener noreferrer" >
              <CardHeader>
                <Image
                  src={project.image}
                  width={400}
                  height={200}
                  alt={project.title}
                  className="rounded-t-lg object-cover w-full h-48"
                />
              </CardHeader  >
              <CardContent className="p-4 bg-[#b916fa1f]">
                <CardTitle className="text-lg font-semibold text-center text-white">
                  {project.title}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-4 text-center text-sm text-white">
                {project.description}
              </CardFooter></a>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
