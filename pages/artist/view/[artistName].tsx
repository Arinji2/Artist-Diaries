import { parseLocalStorageData } from "@/utils/artistLocalStorage";
import { NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
interface Props {
  data: Artist;
  found: boolean;
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
}

const fetchApiData = async (tableName: string, imageId: number) => {
  const res = await fetch(`/api/fetchImage?table=${tableName}&uid=${imageId}`);
  const data = await res.json();
  return data;
};

const View: NextPage<Props> = ({ data, found }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [favorites, setFavorites] = useState<ImageProps[]>([]);

  useEffect(() => {
    console.log(data.favorites);
    data.favorites.forEach(async (fav) => {
      const image = await fetchApiData(fav.table, fav.uid);
      console.log(image[0]);
      //setFavorites((prev) => [...prev, image[0]]);
    });
  }, []);

  return (
    <div className="w-full h-fit bg-[#FFFFFF]">
      <ArtistComp
        image={data.profile_image}
        title={data.name}
        description={data.about}
      />
      {/*favorites.map((fav) => {
        console.log(fav);
        return (
          <FavCompLeft
            image={fav.location}
            title={fav.name}
            description={fav.description}
          />
        );
      })*/}
    </div>
  );
};

const ArtistComp: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="w-full h-[100svh] relative flex flex-col items-center justify-end gap-10">
      <Image
        alt="Artist Image"
        src={image}
        width={674}
        height={447}
        className="absolute bottom-20  left-32 rounded-lg md:block hidden"
      />
      <Image
        alt="Artist Image"
        src={image}
        width={350}
        height={350}
        className="relative  rounded-lg md:hidden block"
      />
      <div className="absolute bottom-28 left-[600px] font-dongle bg-transparent w-[555px] h-[327px]  flex-col items-start justify-start md:flex hidden overflow-hidden">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[70px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#454545] mt-2 ml-10 text-left z-20 line-clamp-4">
          {description}
        </p>
      </div>
      <div className="relative font-dongle bg-transparent w-[305px] h-[227px]  flex-col items-start justify-start md:hidden flex mb-10">
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

const FavCompLeft: FC<CardProps> = ({ image, title, description }) => {
  useEffect(() => {
    console.log(image);
  }, []);
  return (
    <div className="w-full h-[100svh] relative flex flex-col items-center justify-end gap-10">
      <Image
        alt="Artist Image"
        src={image}
        width={674}
        height={447}
        className="absolute bottom-20  left-32 rounded-lg md:block hidden"
      />
      <Image
        alt="Artist Image"
        src={image}
        width={350}
        height={350}
        className="relative  rounded-lg md:hidden block"
      />
      <div className="absolute bottom-28 left-[600px] font-dongle bg-transparent w-[555px] h-[327px]  flex-col items-start justify-start md:flex hidden overflow-hidden">
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[70px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#454545] mt-2 ml-10 text-left z-20 line-clamp-4">
          {description}
        </p>
      </div>
      <div className="relative font-dongle bg-transparent w-[305px] h-[227px]  flex-col items-start justify-start md:hidden flex mb-10">
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

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchArtistViaName?name=${context.params.artistName}`
  );
  const jsonData = await res.json();
  var data = jsonData[0];
  var found = true;
  if (data == undefined) {
    data = {};
    found = false;
  }
  return {
    props: {
      data,
      found,
    },
  };
}

export default View;
