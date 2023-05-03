import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { postAbout } from "@/utils/postFunc";
import { useRouter } from "next/router";
function Page() {
  const [name, setName] = useState("");
  const user = useUser();
  const router = useRouter();

  return (
    <div className="w-full h-[100svh] flex md:flex-row items-center justify-center flex-col bg-[#B1B1B1]">
      <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-start gap-5 z-30">
        <div className="mt-36"></div>
        <h1 className="font-righteous text-[70px] text-white md:text-black">
          Setup
        </h1>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <h3 className="font-righteous text-[#c95774] md:text-[#960226]  text-[40px] md:text-[50px]">
            Enter Artist About
          </h3>

          <textarea
            className="outline-none w-[80%] bg-white rounded-lg p-3 m-3 text-black font-dongle text-3xl h-[140px]  overflow-hidden resize-none "
            id="Text"
            onChange={(e) => setName(e.currentTarget.value)}
          ></textarea>
          <div
            className="hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-500 mt-10 group"
            onClick={() => {
              postAbout(name, user?.id).then(() => {
                const mode = localStorage.getItem("setupMode");
                if (mode === null) router.push("/artist/setup/image");
                else router.push("/artist/setup/confirm");
              });
            }}
          >
            <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-500">
              Continue
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-full h-full absolute md:relative">
        <div className="block md:hidden absolute z-20 bg-[#1A2020] opacity-80 h-full w-full"></div>
        <Image
          src="/setup.jpg"
          alt="Setup"
          fill
          className="object-cover object-top z-10"
        />
      </div>
    </div>
  );
}

export default Page;
