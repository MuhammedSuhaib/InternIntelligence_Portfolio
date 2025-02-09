import type { Metadata } from "next";
import localFont from "next/font/local";
import { Abel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BubbleCursor from "@/components/ui/BubbleCursor";

const abel = Abel({ subsets: ["latin"], 
  weight: ["400"],
  variable: "--font-abel",
});

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
  title: "Muhammad Suhaib`s Portfolio",
  description: "Here is Muhammad Suhaib`s Portfolio showcasing all my skills & projects",
  icons: {
    icon: "/favicon-32x32.png", // Default favicon
    apple: "/apple-icon-180x180.png", // For iOS devices
    shortcut: "/favicon.ico", // Legacy support
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
        <BubbleCursor/>
      </body>
    </html>
  );
}
// 