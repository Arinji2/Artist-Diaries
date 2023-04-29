import { Oval } from "react-loader-spinner";
import * as React from "react";
import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
interface monthlyData {
  name: string;
  description: string;
  artist: string;
  date: string;
  location: string;
  width: string;
  height: string;
}
interface PageProps {
  monthlyData: monthlyData;
}

const Artist: FC<PageProps> = ({ monthlyData }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [widthLoc, setWidthLoc] = useState(0);
  const [heightLoc, setHeightLoc] = useState(0);
  const router = useRouter();
  useEffect(() => {
    console.log(monthlyData);
  }, []);

  useEffect(() => {
    //check for mobile device

    var widthVar = Number.parseInt(monthlyData.width);
    var heightVar = Number.parseInt(monthlyData.height);

    widthVar = Math.round(widthVar > 1000 ? widthVar * 0.3 : widthVar * 0.9);
    heightVar = Math.round(
      heightVar > 1000 ? heightVar * 0.3 : heightVar * 0.9
    );

    if (window.innerWidth < 768) {
      widthVar = window.innerWidth - 50;
      heightVar = Math.round(
        heightVar > window.innerHeight
          ? window.innerHeight - 100
          : heightVar * 0.7
      );
    }
    setWidthLoc(widthVar);
    setHeightLoc(heightVar);
  }, [monthlyData.width, monthlyData.height]);
  return (
    <div className="relative w-full min-h-[100vh] h-fit bg-[#1A2020] flex flex-col items-center justify-center">
      <div className=" mt-36"></div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-10 md:flex-row  md:justify-evenly m-5 relative">
        {imageLoading ? (
          <div className=" relative rounded-lg md:ml-5 flex flex-col items-center justify-center z-40 w-[90%] h-[450px] md:w-[600px] md:h-[600px]">
            <Oval
              color="#960226"
              secondaryColor="transparent"
              strokeWidth={2}
              height={130}
              width={130}
            ></Oval>
          </div>
        ) : (
          <></>
        )}
        <div
          className={` ${
            imageLoading ? " absolute hidden" : " relative block"
          } rounded-lg md:ml-5 flex flex-col items-center justify-center transition-all ease-in-out duration-300 w-[90%] h-[450px] md:w-[600px] md:h-[600px]`}
        >
          <Image
            src={monthlyData?.location}
            alt="Images"
            fill
            quality={100}
            priority
            className="object-cover rounded-lg"
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] h-[50%] gap-10">
          <h2 className="text-4xl  font-righteous text-[#960226]">
            Name: {monthlyData?.name}
          </h2>
          <h3 className="text-2xl text-white font-righteous">
            Description: {monthlyData?.description}
          </h3>

          <h4 className="text-xl text-white font-righteous">
            Updated At: {monthlyData?.date == "" ? "Loading" : monthlyData.date}
          </h4>

          <h5
            className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            Back to Home{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("monthly")
    .select("*")
    .eq("mode", "artist");

  if (data === null) return;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchArtist?id=${data[0].data.id}`
  );
  const formatData = await res.json();
  const monthlyData = {
    name: formatData[0].name,
    description: formatData[0].about,
    location: formatData[0].profile_image,
    date: data[0].updatedAt,
  };

  return {
    props: {
      monthlyData,
    },
    revalidate: 604800,
  };
}

export default Artist;
