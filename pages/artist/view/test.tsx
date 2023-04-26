import { parseLocalStorageData } from "@/utils/artistLocalStorage";
import { NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
interface Props {
  data: Artist;
  found: boolean;
  favoriteData: ImageProps[];
}

interface ArtistImageProps {
  location: string;
  table: string;
  uid: number;
}

interface Artist {
  name: string;
  about: string;
  profile_image: string;
  id: string;
  likes: number;
  images: ArtistImageProps[];
  favorites: ArtistImageProps[];
}

interface CardProps {
  image: string;
  title: string;
  description: string;
}

interface ImageProps {
  location: string;
  name: string;
  description: string;
  likes: string[];
  width: string;
  height: string;
}

const fetchApiData = async (tableName: string, imageId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchImage?table=${tableName}&uid=${imageId}`
  );
  const data = await res.json();
  console.log(data);
  return data;
};

const View: NextPage<Props> = ({ data, found, favoriteData }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [favorites, setFavorites] = useState<ImageProps[]>([]);

  return (
    <div className="w-full h-fit bg-[#FFFFFF]">
      <ArtistComp
        image={data.profile_image}
        title={data.name}
        description={data.about}
        key={data.name}
      />
      <h1 className="font-righteous text-[#960226] md:text-[90px] text-[50px]">
        Artist Favorites
      </h1>
      <div className="w-full h-fit bg-[#440212] pt-10">
        {favoriteData.map((image, index) => {
          if (index % 2 === 1)
            return (
              <ArtistComp
                image={image.location}
                title={image.name}
                description={image.description}
                key={index}
              />
            );
          else
            return (
              <FavCompRight
                image={image.location}
                title={image.name}
                description={image.description}
                key={index}
              />
            );
        })}
      </div>
    </div>
  );
};

const ArtistComp: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="w-full h-[100svh] relative flex flex-col items-center justify-end gap-10 overflow-hidden rounded-lg">
      <Image
        alt="Artist Image"
        src={image}
        width={674}
        height={347}
        quality={100}
        className="absolute bottom-[10%]  left-[10%] rounded-lg md:block hidden object-cover object-top"
      />
      <Image
        alt="Artist Image"
        src={image}
        width={350}
        height={350}
        quality={100}
        className="relative  rounded-lg md:hidden block"
      />
      <div className="absolute bottom-[15%] left-[40%] font-dongle bg-transparent w-[555px] h-[327px]  flex-col items-start justify-start md:flex hidden overflow-hidden">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[70px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#454545] mt-2 ml-10 text-left z-20 line-clamp-4">
          {description}
        </p>
      </div>
      <div className="relative font-dongle bg-transparent w-[305px] h-[227px]  flex-col items-start justify-start md:hidden flex">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[50px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[17px] font-normal text-[#454545] mt-2 ml-10 text-left z-20 ">
          {description}
        </p>
      </div>
    </div>
  );
};
const FavCompRight: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="w-full h-[100svh] relative flex flex-col items-center justify-end gap-10 overflow-hidden">
      <Image
        alt="Artist Image"
        src={image}
        width={674}
        height={347}
        quality={100}
        className="absolute bottom-[10%]  right-[10%] rounded-lg md:block hidden object-cover object-top"
      />
      <Image
        alt="Artist Image"
        src={image}
        width={350}
        height={350}
        quality={100}
        className="relative  rounded-lg md:hidden block"
      />
      <div className="absolute bottom-[15%] left-[40%] font-dongle bg-transparent w-[555px] h-[327px]  flex-col items-start justify-start md:flex hidden overflow-hidden">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[70px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#454545] mt-2 ml-10 text-right z-20 line-clamp-4">
          {description}
        </p>
      </div>
      <div className="relative font-dongle bg-transparent w-[305px] h-[227px]  flex-col items-start justify-start md:hidden flex ">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[50px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[17px] font-normal text-[#454545] mt-2 ml-10 text-left z-20 ">
          Eelellee elele elele ele elel ele elelelele e lelee lele ele le e e
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchArtistViaName?name=${context.params.artistName}`
  );
  const jsonData = await res.json();
  var data = jsonData[0];
  var found = true;
  var favoriteData: ImageProps[] = [];
  if (data == undefined) {
    data = {};
    found = false;
  }

  if (found) {
    const fetches = data.favorites.map(async (image: ArtistImageProps) => {
      const res = await fetchApiData(image.table, image.uid);
      console.log(res[0]);
      return res[0];
    });

    favoriteData = await Promise.all(fetches);
  }

  return {
    props: {
      data,
      found,
      favoriteData,
    },
  };
}

export default View;
