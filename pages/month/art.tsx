import { Oval } from "react-loader-spinner";
import * as React from "react";
import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { MonthlyData } from "@/utils/types";
import {
  fetchArtistData,
  fetchImageData,
  fetchMonthlyData,
} from "@/utils/fetchFunc";

interface PageProps {
  monthlyData: MonthlyData;
}

const Art: FC<PageProps> = ({ monthlyData }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [widthLoc, setWidthLoc] = useState(0);
  const [heightLoc, setHeightLoc] = useState(0);
  const router = useRouter();
  useEffect(() => {}, []);

  useEffect(() => {
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
          <div
            className=" relative rounded-lg md:ml-5 flex flex-col items-center justify-center z-40"
            style={{ width: widthLoc, height: heightLoc }}
          >
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
          } rounded-lg md:ml-5 flex flex-col items-center justify-center transition-all ease-in-out duration-300`}
          style={{ width: widthLoc, height: heightLoc }}
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
        <div className="flex flex-col items-center justify-center w-[50%] h-[50%] gap-10">
          <h2 className="text-4xl  font-righteous text-[#960226]">
            Name: {monthlyData?.name}
          </h2>
          <h3 className="text-2xl text-white font-righteous">
            Description: {monthlyData?.description}
          </h3>
          <h4 className="text-xl text-white font-righteous">
            Artist: {monthlyData?.artist == "" ? "Loading" : monthlyData.artist}
          </h4>
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
  const data = await fetchMonthlyData("art");

  if (data === null) return;

  const image = await fetchImageData(data[0].data.table, data[0].data.id);

  const artist = await fetchArtistData(image.artist);
  if (artist === undefined) return;

  const monthlyData = {
    name: image.name,
    artist: artist.name,
    description: image.description,
    date: data[0].updatedAt,
    location: image.location,
    width: image.width,
    height: image.height,
  };
  return {
    props: {
      monthlyData,
    },
    revalidate: 604800,
  };
}

export default Art;
