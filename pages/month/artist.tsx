import { Oval } from "react-loader-spinner";
import * as React from "react";
import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchArtistData, fetchMonthlyData } from "@/utils/fetchFunc";
import type { MonthlyData } from "@/utils/types";

interface PageProps {
  monthlyData: MonthlyData;
}

const Artist: FC<PageProps> = ({ monthlyData }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();

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
  const data = await fetchMonthlyData("artist");
  if (data === null) return;

  const artist = await fetchArtistData(data[0].data.id);
  if (artist === undefined) return;
  const monthlyData = {
    name: artist.name,
    description: artist.about,
    location: artist.profile_image,
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
