import type { Metadata } from "next";
import localFont from "next/font/local";
import { Abel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BubbleCursor from "@/components/ui/BubbleCursor";

const abel = Abel({ subsets: ["latin"], weight: ["400"], variable: "--font-abel" });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Muhammad Suhaib's Portfolio | JAM-Stack & Next.js Developer",
  description:
    "Muhammad Suhaib's portfolio showcasing skills, projects, and expertise in React, Next.js, TypeScript, and Python.",
  keywords: [
    "Muhammad Suhaib",
    "JAM-Stack Developer",
    "Nextjs Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Python Developer",
    "Web Developer",
    "Portfolio",
  ],
  robots: "index, follow", // Allows search engines to index and follow links
  openGraph: {
    title: "Muhammad Suhaib's Portfolio",
    description:
      "A portfolio of Muhammad Suhaib showcasing React, Next.js, TypeScript, and Python projects.",
    url: "https://muhammedsuhaib.netlify.app/",
    images: [
      {
        url: "/muhammad-suhaib.jpg", // Correct property: 'url' inside 'images'
        width: 1200,  // Optional: Specify image width
        height: 630,  // Optional: Specify image height
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Twitter card with large image
    title: "Muhammad Suhaib's Portfolio",
    description:
      "JAM-Stack Developer Portfolio showcasing React, Next.js, TypeScript, and Python expertise.",
    images: [
      {
        url: "/muhammad-suhaib.jpg", // Correct property: 'url' inside 'images'
        width: 1200,  // Optional: Specify image width
        height: 630,  // Optional: Specify image height
      },
    ],
  },
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-icon-180x180.png",
    shortcut: "/favicon.ico",
  },
  other: {
    "google-site-verification": "it3bdI8wxU7vBHv7oC3MIfPf0bPZEZbNI84zw7ZdYSw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abel.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#0d0b1f] via-[#1e0625] to-[#1b1b3a] transition-all hover:bg-gradient-to-tl hover:from-[#25162f] hover:via-[#0d0b1f] hover:to-[#0a0a0a]`}
      >
        <Header />
        {children}
        <BubbleCursor />
      </body>
    </html>
  );
}