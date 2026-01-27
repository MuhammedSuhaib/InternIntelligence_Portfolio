import React from "react";
import Image from "next/image";
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

const techs = [
  { src: "/h.png", alt: "HTML", name: "HTML" },
  { src: "/c.png", alt: "CSS", name: "CSS" },
  { src: "/js.png", alt: "JavaScript", name: "JavaScript" },
  { src: "/ts.png", alt: "TypeScript", name: "TypeScript" },
  { src: "/nodejs.png", alt: "Node.js", name: "Node.js" },
  { src: "/npm.png", alt: "npm", name: "npm" },
  { src: "/nextjs.png", alt: "Next.js", name: "Next.js" },
  { src: "/tailwind.png", alt: "Tailwind CSS", name: "Tailwind CSS" },
  { src: "/shadcn.png", alt: "shadcn", name: "shadcn" },
  { src: "/py.png", alt: "Python", name: "Python" },
  { src: "/st.png", alt: "Streamlit", name: "Streamlit" },
  { src: "/ch.png", alt: "Chainlit", name: "Chainlit" },
  { src: "/openai.png", alt: "OpenAI SDK", name: "OpenAI SDK" },
  { src: "/gemini.png", alt: "Gemini API", name: "Gemini API" },
  { src: "/firebase.png", alt: "Firebase", name: "Firebase" },
  { src: "/netlify.png", alt: "Netlify", name: "Netlify" },
  // { src: "/sanity.png", alt: "Sanity CMS", name: "Sanity CMS" },
  // { src: "/stripe.png", alt: "Stripe", name: "Stripe" },
  // { src: "/Fastapi.png", alt: "Fastapi", name: "Stripe" },
  // { src: "/Neon.png", alt: "Neon", name: "Stripe" },
  // { src: "/docker.png", alt: "docker", name: "Stripe" },
  // { src: "/kubernetes.png", alt: "kubernetes", name: "Stripe" },
  // { src: "/claude code.png", alt: "kubernetes", name: "Stripe" },
  // { src: "/hugginface.png", alt: "kubernetes", name: "Stripe" },
  // { src: "/docussarus.png", alt: "kubernetes", name: "Stripe" },
  // { src: "/better-aut .png", alt: "kubernetes", name: "Stripe" },
  // { src: "/mcp servers.png", alt: "kubernetes", name: "Stripe" },
];

export default function Technologies() {
  return (
    <div className="h-full w-full max-w-screen-lg flex flex-col items-center justify-center gap-6 py-10">
      <h1
        className={`${merienda.className
          } pb-5 text-4xl md:text-6xl mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950`}
      >
        Technologies
      </h1>
      <ul className="flex flex-wrap justify-center gap-14 text-2xl bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950">
        {techs.map(({ src, alt, name }) => (
          <li key={name}
            className="flex flex-col items-center transition-transform hover:animate-spin-clockwise ">
            <Image src={src} alt={alt} width={100} height={100} />
            <p className="text-center mt-2">{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
