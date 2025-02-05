import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });
function Header() {
  return (
    <header className="mb-10">
      <div className="p-5 m-0 flex justify-between rounded-md shadow-md shadow-[#d431dad8] hover:shadow-[#8df4f7]">
        <strong className="text-4xl mt-5 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:from-yellow-200 hover:to-fuchsia-950">
          𝔐𝔲𝔥𝔞𝔪𝔪𝔞𝔡 ͯś𝔲𝔥𝔞𝔦𝔟
        </strong>
        <nav className="flex justify-between items-center">
          <ul className={`${merienda.className}  text-white space-x-4 hidden md:flex justify-center items-center`}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#technologies">Technologies</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/co">Contact</Link></li>
            <li><Link href="/About">About Me</Link></li>
          </ul>
          <span className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="bg-white m-5 rounded-md" />
              </SheetTrigger>
              <SheetContent className={`${merienda.className}  text-white space-x-4 bg-gradient-to-b hover:from-[#32027e] hover:to-black hover:bg-gradient-to-br from-black   to-[#32027e] transition-all duration-10000 font-bold`}>
                <ul className="text-white space-y-3">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#technologies">Technologies</Link></li>
                  <li><Link href="/#projects">Projects</Link></li>
                  <li><Link href="/co">Contact</Link></li>
                  <li><Link href="/About">About Me</Link></li>
                </ul>
              </SheetContent>
            </Sheet>
          </span>
        </nav>
      </div>
    </header>
  );
}
export default Header;
