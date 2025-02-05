import React from "react";
import Image from "next/image";

function Technologies() {
  return (
    <div className="h-full w-full  flex flex-col items-center justify-center gap-6 py-10">
      <h1 className="text-6xl mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950">
        Technologies
      </h1>
      <div className=" flex flex-row sm:flex-col  gap-6">
        {/* Row 1 */}
        <ul className="flex sm:flex-row flex-col  gap-14 text-2xl bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950  ">
          <li className="flex flex-col items-center">
            <Image
              src="/h.png"
              alt="HTML"
              width={100}
              height={100}
              className="size-[140px]"
            />
            <p className="text-center mt-2">HTML</p>
          </li>
          <li className="flex flex-col items-center">
            <Image src="/c.png" alt="CSS" width={100} height={100} />
            <p className="text-center mt-2">CSS</p>
          </li>
          <li className="flex flex-col items-center">
            <Image src="/js.png" alt="JavaScript" width={100} height={100} />
            <p className="text-center mt-2">JavaScript</p>
          </li>
          <li className="flex flex-col items-center">
            <Image
              src="/ts.png"
              alt="TypeScript"
              width={100}
              height={100}
              className="size-[140px]"
            />
            <p className="text-center mt-2">TypeScript</p>
          </li>
        </ul>
        {/* Row 2 */}
        <ul className="flex sm:flex-row flex-col gap-6  text-2xl bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950     ">
          <li className="flex flex-col items-center">
            <Image src="/nodejs.png" alt="Node.js" width={100} height={100} />
            <p className="text-center mt-2">Node.js</p>
          </li>
          <li className="flex flex-col items-center">
            <Image src="/npm.png" alt="npm" width={100} height={100} />
            <p className="text-center mt-2">npm</p>
          </li>
          <li className="flex flex-col items-center">
            <Image src="/nextjs.png" alt="Next.js" width={100} height={100} />
            <p className="text-center mt-2">Next.js</p>
          </li>
          <li className="flex  flex-col items-center">
            <Image
              src="/tailwind.png"
              alt="Tailwind CSS"
              width={100}
              height={100}
            />
            <p className="text-center mt-2">Tailwind CSS</p>
          </li>
          <li className="flex flex-col items-center">
            <Image src="/shadcn.png" alt="shadcn" width={100} height={100} />
            <p className="text-center mt-2">shadcn</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Technologies;
