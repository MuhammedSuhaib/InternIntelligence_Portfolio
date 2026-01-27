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
  {
    link: `https://console-to-cloud.netlify.app/`,
    title: "Full-Stack Todo Application",
    description: "Modern full-stack todo application built with Next.js 16+, FastAPI, and Better Auth for authentication. Complete task management solution with user authentication, data isolation, and AI agent integration that can perform CRUD operations on your behalf.",
    image: "/todo-app.jpg",
  },
  {
    link: `https://muhammedsuhaib.github.io/SpecKit-Plus/`,
    title: "Physical AI & Humanoid Robotics: Interactive Textbook",
    description: "Interactive learning platform featuring a complete textbook with intelligent RAG chatbot. Combines Docusaurus frontend with FastAPI backend for enhanced learning experience. Features Matrix-themed UI, Qdrant vector database, and Better-auth authentication.",
    image: "/physical-ai-textbook.jpg",
  },
  {
    link: `https://muhammedsuhaibhackathon2.vercel.app/`,
    title: "E-commerce Shopping Website",
    description:
      "A full-stack e-commerce platform built with Next.js, Tailwind CSS, and Sanity CMS. Features responsive design, dynamic product display, cart functionality, search, and secure payment processing with Stripe.",
    image: "/Hekto.png",
  },
  {
    link: `https://cyberdevs.netlify.app/`,
    title: "Firebase Chat PWA ",
    description:
      "Real-time multi-room PWA chat with Google Auth, built using Firebase, Next.js 15, and Tailwind CSS. No backend or SQL needed.",
    image: "/cyber.png",
  },
  {
    link: `https://github.com/MuhammedSuhaib/gemini_Openai-Agent`,
    title: "AI Agent (Gemini + OpenAI)",
    description:
      "AI agent using both Gemini and OpenAI, shared in a LinkedIn post.",
    image: "/agent.png",
  },
  {
    link: `https://github.com/MuhammedSuhaib/Youtube`,
    title: "YouTube Clone",
    description: "Modern YouTube clone built with Next.js featuring video browsing, offline connectivity detection, responsive design, and seamless video playback. Includes custom navigation, sidebar, and video grid components.",
    image: "/youtube-clone.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/multi_agent`,
    title: "Multi-Agent AI System",
    description: "Sophisticated multi-agent system with specialized agents for different domains. Features math and physics agents with tool integration, dynamic instructions, and guardrails for safe AI interactions.",
    image: "/multi-agent.jpg",
  },
  {
    link: `https://hackathon-milestone-3-4-5-alpha.vercel.app/`,
    title: "Interactive Resume Builder",
    description:
      "A resume builder with interactive features using pure HTML and CSS.",
    image: "/resume.jpg",
  },
  {
    link: `https://instagrem-com.netlify.app/`,
    title: "Instagram Attack",
    description: "A fun project demonstrating security vulnerabilities.",
    image: "/ig.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/panaCloud/`,
    title: "Panacloud Website",
    description: "A static website built with HTML and CSS.",
    image: "/pc.jpeg",
  },
  {
    link: `https://nextjssanity.netlify.app/`,
    title: "Next.js & Sanity Project",
    description:
      "Exploring Sanity as a headless CMS with Next.js and Tailwind.",
    image: "/Sanity.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/toggle_mode.Vite/`,
    title: "Toggle themes",
    description:
      "Exploring React + vite + Typescript along  with Tailwind Css.",
    image: "https://raw.githubusercontent.com/MuhammedSuhaib/toggle_mode.Vite/refs/heads/main/public/og.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/todo.React/`,
    title: "Simple React Project",
    description: "  Exploring React  with Tailwind Css.",
    image: "/todos.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/dataFetching/`,
    title: "API Data Fetching Project",
    description: "Fetching and displaying API data in a Next.js project.",
    image: "/get.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/Ddsgnr/`,
    title: "Educational Website Clone",
    description: "A cloned educational website built with Next.js and Tailwind CSS.",
    image: "/edu.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/tailwindCss/`,
    title: "Space Exploration Landing Page",
    description: "A Next.js landing page showcasing space exploration.",
    image: "/space.jpg",
  },
  {
    link: `https://better-auth-neon-db.netlify.app/`,
    title: "Next.js Landing Page",
    description:
      "A landing page built with Next.js and pure CSS modules with better-auth and neon-db",
    image: "/resp.jpg",
  },
  {
    link: `https://muhammedsuhaib.github.io/next.js-page-routing/About/Team`,
    title: "Next.js Hot Reload Demo",
    description:
      "A project demonstrating Next.js Hot Reload feature with pyodide",
    image: "/hotReload.png",
  },
  {
    link: `https://muhammedsuhaib.github.io/Resume_Builder/HACKATHON-Milestone-1-2/index.html`,
    title: "static Resume Builder",
    description: "A static resume  using pure HTML and CSS.",
    image: "/plain.png",
  },
  {
    link: `https://heto-ui-clone.netlify.app/`,
    title: "Pixel-Perfect E-commerce Clone",
    description:
      "A precise, pixel-perfect recreation of an e-commerce website.",
    image: "/px.jpeg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/1stfigmaClone.git`,
    title: "Jewelry Website Clone",
    description: "A pixel-perfect Figma-based jewelry website clone.",
    image: "/clone-img.webp",
  },
  {
    link: `https://push-notifcation-splitter.streamlit.app`,
    title: "Smartband Exam Hack",
    description:
      "A notification splitter tool designed to bypass exam restrictions using smartbands.",
    image: "/smartband.jpeg",
  },
  {
    link: `https://share.streamlit.io/user/muhammedsuhaib`,
    title: "All Streamlit Projects",
    description:
      "Collection of Streamlit apps built for learning and experimenting.",
    image: "/streamlit.jpeg",
  },
  {
    link: `https://growthmindsetbysirzia.streamlit.app`,
    title: "Growth Mindset Challenge",
    description:
      "A motivational app built using Streamlit to promote growth mindset.",
    image: "/growth.jpeg",
  },
  {
    link: `https://readable-password-generator.streamlit.app`,
    title: "Readable Password Generator",
    description:
      "Generates secure, easy-to-remember passwords using Streamlit.",
    image: "/password.jpeg",
  },
  {
    link: `https://muhammedsuhaib.github.io/markdownResume/`,
    title: "Markdown Resume",
    description:
      "A simple, Jekyll-powered resume built using Markdown and GitHub Pages. Highlights skills, projects, and experience with a clean developer-friendly layout.",
    image: "/MuhammedResume.jpeg",
  },
  {
    link: `https://muhammedsuhaib.github.io/WanderLuxo/`,
    title: "WanderLuxo",
    description: "Simple HTML, CSS, JS travel site landing page.",
    image: "/wanderluxo.jpeg",
  },
  // CLI
  {
    link: `https://github.com/MuhammedSuhaib/uvpy/blob/master/atm.py`,
    title: "OOP Python CLI ATM",
    description:
      "An OOP-based terminal tool using uv for fast package management, styled with pyfiglet and colorama.",
    image: "/opp_atm.png",
  },
  {
    link: `https://github.com/MuhammedSuhaib/stickman_animation/blob/main/animated_stickman.bat`,
    title: "Stickman Animation",
    description:
      "A short 5–10s batch script animation made for fun during Ramazan.",
    image: "/stickman.png",
  },
  {
    link: `https://www.linkedin.com/posts/suhaib1_activity-7238076836780343296-H6YC?utm_source=social_share_send&utm_medium=member_desktop_web`,
    title: "CLI Ghost Image",
    description:
      "Displays a ghost image in the terminal using Chalk and animations.",
    image: "/ghoost.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/Fast-Quiz`,
    title: "CLI Quiz App",
    description:
      "A CLI-based quiz app built with TypeScript, Inquirer, and Chalk.",
    image: "/Quiz.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/Adventure-game`,
    title: "CLI Adventure Game",
    description:
      "A text-based adventure game created with TypeScript and CLI libraries.",
    image: "/g.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/Student-Management-System`,
    title: "CLI Student Management System",
    description: "A CLI-based student management system built with TypeScript.",
    image: "/Std.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/TODOS`,
    title: "CLI To-Do App",
    description:
      "A simple CLI to-do list application using TypeScript and Inquirer.",
    image: "/todos.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/ATM`,
    title: "CLI ATM Simulator",
    description: "A command-line ATM simulation built with TypeScript.",
    image: "/atm.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/currency_converter`,
    title: "CLI Currency Converter",
    description: "A CLI app for converting currencies using TypeScript.",
    image: "/crr.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/word_counter.git`,
    title: "CLI Word Counter",
    description: "A word-counting tool built for the terminal.",
    image: "/w.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/Guess-the-Number-Game`,
    title: "CLI Number Guessing Game",
    description: "A CLI game where users guess a number.",
    image: "/guess.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/smple_calculator`,
    title: "CLI Calculator",
    description: "A simple command-line calculator using TypeScript.",
    image: "/Simple.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/45-taks.git`,
    title: "Node.js TypeScript Tasks",
    description: "A collection of 45 TypeScript tasks built with Node.js.",
    image: "/45.png",
  },
  {
    link: `https://github.com/MuhammedSuhaib/finance-tracker`,
    title: "Personal Finance Tracker CLI",
    description: "Professional CLI application for tracking expenses, income, budgets, and generating financial insights. Built with Python, questionary, rich, and uv.",
    image: "/finance-tracker.jpg",
  },
  {
    link: `https://github.com/MuhammedSuhaib/LevelUpSpeckit-Plus`,
    title: "LevelUpSpeckit-Plus - AI Productivity Toolkit",
    description: "Comprehensive toolkit for students working with AI agents in coding projects. Includes solutions for multi-agent coordination, audio notifications, token management, and specialized AI skills for hackathons.",
    image: "/levelupspeckit-plus.jpg",
  },
];

function Projects() {
  return (
    <div
      id="pro"
      className="flex flex-col items-center justify-center gap-6 px-6 py-10"
    >
      <h1
        className={`${merienda.className} mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text pb-16 text-6xl text-transparent`}
      >
        Projects
      </h1>
      <ul>
        <li className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="transform overflow-hidden transition animate-duration-faster hover:animate-blink"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <CardHeader>
                  <Image
                    src={project.image}
                    width={400}
                    height={200}
                    alt={project.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="bg-[#b916fa1f] p-4">
                  <CardTitle className="text-center text-lg font-semibold text-white">
                    {project.title}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-4 text-center text-sm text-white">
                  {project.description}
                </CardFooter>
              </a>
            </Card>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default Projects;
