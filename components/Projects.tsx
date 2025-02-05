import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const projects = [
  { title: "E-commerce Website", description: "A full-stack e-commerce platform built with Next.js and Tailwind CSS.", image: "/Hekto.png" },
  { title: "Interactive Resume Builder", description: "A resume builder with interactive features using pure HTML and CSS.", image: "/resume.jpg" },
  { title: "Pixel-Perfect E-commerce Clone", description: "A precise, pixel-perfect recreation of an e-commerce website.", image: "/px.jpeg" },
  { title: "Panacloud Website", description: "A static website built with HTML and CSS.", image: "/pc.jpeg" },
  { title: "Next.js & Sanity Project", description: "Exploring Sanity as a headless CMS with Next.js and Tailwind.", image: "/Sanity.png" },
  { title: "API Data Fetching Project", description: "Fetching and displaying API data in a Next.js project.", image: "/get.png" },
  { title: "Educational Website Clone", description: "A cloned educational website built with Next.js and Tailwind CSS.", image: "/edu.png" },
  { title: "Jewelry Website Clone", description: "A pixel-perfect Figma-based jewelry website clone.", image: "/clone-img.webp" },
  { title: "Space Exploration Landing Page", description: "A Next.js landing page showcasing space exploration.", image: "/space.jpg" },
  { title: "Next.js Landing Page", description: "A landing page built with Next.js and pure CSS modules.", image: "/resp.jpg" },
  { title: "Next.js Hot Reload Demo", description: "A project demonstrating Next.js Hot Reload feature.", image: "/hotReload.png" },
  { title: "CLI Ghost Image", description: "Displays a ghost image in the terminal using Chalk and animations.", image: "/ghoost.jpg" },
  { title: "CLI Quiz App", description: "A CLI-based quiz app built with TypeScript, Inquirer, and Chalk.", image: "/Quiz.jpg" },
  { title: "CLI Adventure Game", description: "A text-based adventure game created with TypeScript and CLI libraries.", image: "/g.jpg" },
  { title: "CLI Student Management System", description: "A CLI-based student management system built with TypeScript.", image: "/todos.jpg" },
  { title: "CLI To-Do App", description: "A simple CLI to-do list application using TypeScript and Inquirer.", image: "/todos.jpg" },
  { title: "CLI ATM Simulator", description: "A command-line ATM simulation built with TypeScript.", image: "/atm.jpg" },
  { title: "CLI Currency Converter", description: "A CLI app for converting currencies using TypeScript.", image: "/crr.jpg" },
  { title: "CLI Word Counter", description: "A word-counting tool built for the terminal.", image: "/w.jpg" },
  { title: "CLI Number Guessing Game", description: "A CLI game where users guess a number.", image: "/Guess.jpg" },
  { title: "CLI Calculator", description: "A simple command-line calculator using TypeScript.", image: "/simple.jpg" },
  { title: "Node.js TypeScript Tasks", description: "A collection of 45 TypeScript tasks built with Node.js.", image: "/45.png" },
];

function Projects() {
  return (
    <div id="pro" className="flex flex-col items-center justify-center gap-6 py-10 px-6">
      <h1 className="mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text text-6xl text-transparent">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Image
                src={project.image}
                width={400}
                height={200}
                alt={project.title}
                className="rounded-t-lg object-cover w-full h-48"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-center">
                {project.title}
              </CardTitle>
            </CardContent>
            <CardFooter className="p-4 text-center text-sm text-gray-600">
              {project.description}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
