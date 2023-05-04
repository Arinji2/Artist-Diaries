import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { postEmail, postImage, postImageID, postName } from "@/utils/postFunc";
import { useRouter } from "next/router";
import { IKContext, IKUpload } from "imagekitio-react";
import { reFetchArtistData } from "../manage";
function Page() {
  const [name, setName] = useState("");
  const user = useUser();
  const router = useRouter();
  const buttonRef = React.useRef(null);

  return (
    <div className="w-full h-[100svh] flex md:flex-row items-center justify-center flex-col bg-[#B1B1B1]">
      <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-start gap-5 z-30">
        <div className="mt-36"></div>
        <h1 className="font-righteous text-[70px] text-white md:text-black">
          Setup
        </h1>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <h3 className="font-righteous text-[#c95774] md:text-[#960226] text-[50px]">
            Upload Profile Image
          </h3>
          <IKContext
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_LINK}
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC}
            authenticationEndpoint={`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/imageKit/getAuthEndpoint`}
          >
            <IKUpload
              fileName={name}
              folder={"Profiles"}
              useUniqueFileName={false}
              style={{ display: "none" }}
              inputRef={buttonRef}
              onSuccess={async (res) => {
                await postImage(res.url, user?.id);
                await postImageID(res.fileId, user?.id);
                if (user?.email !== undefined)
                  await postEmail(user?.email, user?.id);
                await reFetchArtistData(user?.id);
                router.push("/artist/dashboard");
              }}
            />
            {buttonRef && (
              <div className="w-full flex flex-col items-center justify-center pb-10">
                <div
                  className="text-center text-[50px] hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 group hover:cursor-pointer"
                  onClick={() => {
                    if (buttonRef.current !== null)
                      (buttonRef.current as HTMLInputElement).click();
                  }}
                >
                  <p className="font-righteous text-white group-hover:text-[#1A2020] text-2xl md:text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                    Upload
                  </p>
                </div>
              </div>
            )}
          </IKContext>
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
