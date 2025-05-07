import Image from "next/image";
import React from "react";
function Pic() {
  return (
    <div className="flex justify-center items-center mt- my-4">
      {/* Profile Picture Section */}

      <Image
        src="/muhammad-suhaib.jpg"
        alt="Muhammad Suhaib's Portfolio Picture"
        width={250}
        height={250}
        className="rounded-full p-3 ring-[6px] ring-[#d431dad8] shadow-2xl shadow-[#d431dad8] hover:shadow-[#c58bf5] hover:ring-[#a245f8] "
      />
    </div>
  );
}

export default Pic;
