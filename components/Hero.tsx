import React from "react";
import { Merienda } from "next/font/google";
const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

function Main() {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="to-emerald-300hover:to-fuchsia-950 bg-gradient-to-br from-fuchsia-400 via-violet-600 bg-clip-text text-center text-5xl text-transparent hover:bg-gradient-to-tl sm:text-7xl">
        𝔐𝔲𝔥𝔞𝔪𝔪𝔞𝔡 <span className="text-8xl"> ͯś</span>𝔲𝔥𝔞𝔦𝔟{" "}
      </h1>
      <h2
        className={`${merienda.className} ml-7 mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text text-4xl text-transparent hover:bg-gradient-to-tl hover:to-fuchsia-950 md:ml-0`}
      >
        {" "}
        &lt; Fυʅʅ-Sƚαƈƙ & AI Eɳɠιɳҽҽɾ /&gt;
      </h2>

      <p className="mt-11 flex w-3/4 max-w-screen-md justify-center text-center text-xl">
        𝑰 𝒃𝒖𝒊𝒍𝒅 𝒊𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒕 𝒔𝒚𝒔𝒕𝒆𝒎𝒔 𝒂𝒏𝒅 𝒔𝒄𝒂𝒍𝒂𝒃𝒍𝒆 𝑫𝒆𝒗𝑶𝒑𝒔-𝒅𝒓𝒊𝒗𝒆𝒏 𝒂𝒓𝒄𝒉𝒊𝒕𝒆𝒄𝒕𝒖𝒓𝒆𝒔.
        𝑺𝒑𝒆𝒄𝒊𝒂𝒍𝒊𝒛𝒊𝒏𝒈 𝒊𝒏 𝑨𝒈𝒆𝒏𝒕𝒊𝒄 𝑨𝑰, 𝑷𝒚𝒕𝒉𝒐𝒏, 𝒂𝒏𝒅 𝑵𝒆𝒙𝒕.𝒋𝒔, 𝑰 𝒃𝒓𝒊𝒅𝒈𝒆 𝒕𝒉𝒆 𝒈𝒂𝒑 𝒃𝒆𝒕𝒘𝒆𝒆𝒏 𝒄𝒐𝒎𝒑𝒍𝒆𝒙 𝒍𝒐𝒈𝒊𝒄
        𝒂𝒏𝒅 𝒅𝒚𝒏𝒂𝒎𝒊𝒄 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆𝒔. 𝑳𝒆𝒕&apos;𝒔 𝒃𝒖𝒊𝒍𝒅 𝒕𝒉𝒆 𝒇𝒖𝒕𝒖𝒓𝒆 𝒕𝒐𝒈𝒆𝒕𝒉𝒆𝒓!
      </p>
    </div>
  );
}

export default Main;
