import Pic from "../components/Pic";
import Main from "../components/Hero";
import Header from "@/components/Header";
import Technologies from "@/components/Technologies";
import Technologies2 from "@/components/Projects";
export default function Home() {
  return (
    <div
      className=" w-full h-full  bg-gradient-to-b hover:from-[#32027e] hover:to-black hover:bg-gradient-to-br from-black   to-[#26045c] transition-all duration-10000">
      <Header />
      <Pic />
      <Main />
      <Technologies/>
    </div>
  );
}
