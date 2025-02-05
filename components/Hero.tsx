import React from "react";
import { Merienda } from "next/font/google";
const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

function Main() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl  from-fuchsia-400 via-violet-600 to-emerald-300hover:to-fuchsia-950 sm:text-7xl text-center bg-gradient-to-br text-transparent bg-clip-text hover:bg-gradient-to-tl">
        𝔐𝔲𝔥𝔞𝔪𝔪𝔞𝔡 <span className="text-8xl"> ͯś</span>𝔲𝔥𝔞𝔦𝔟     </h1>
        <h2 className={`${merienda.className} text-4xl ml-7 md:ml-0 mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950 `}>
          {" "}
          &lt; Ꮤeb 𐌃eveloper/&gt;
        </h2>

        <p className="w-3/4 mt-11 text-xl">
          𝑰&apos;𝒎 𝒂 𝒘𝒆𝒃 𝒅𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓 𝒔𝒌𝒊𝒍𝒍𝒆𝒅 𝒊𝒏 𝑵𝒆𝒙𝒕𝒋𝒔. 𝒂𝒏𝒅 𝑻𝒂𝒊𝒍𝒘𝒊𝒏𝒅. 𝒇𝒐𝒄𝒖𝒔𝒆𝒅 𝒐𝒏
          𝒃𝒖𝒊𝒍𝒅𝒊𝒏𝒈 𝒄𝒍𝒆𝒂𝒏, 𝒔𝒄𝒂𝒍𝒂𝒃𝒍𝒆 𝒂𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏𝒔. 𝑰 𝒄𝒓𝒆𝒂𝒕𝒆 𝒆𝒇𝒇𝒊𝒄𝒊𝒆𝒏𝒕 𝒔𝒐𝒍𝒖𝒕𝒊𝒐𝒏𝒔
          𝒇𝒐𝒓 𝒅𝒚𝒏𝒂𝒎𝒊𝒄 𝒖𝒔𝒆𝒓 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆𝒔. 𝑳𝒆𝒕&apos;𝒔 𝒃𝒖𝒊𝒍𝒅 𝒔𝒐𝒎𝒆𝒕𝒉𝒊𝒏𝒈 𝒈𝒓𝒆𝒂𝒕 𝒕𝒐𝒈𝒆𝒕𝒉𝒆𝒓!
        </p>
      </div>
    </div>
  );
}

export default Main;
