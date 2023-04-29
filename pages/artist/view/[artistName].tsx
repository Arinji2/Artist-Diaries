import { faHeart } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

interface Props {
  data: any;
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

interface ArtistImageProps {
  location: string;
  table: string;
  uid: number;
}

interface ImageProps {
  location: string;
  name: string;
  description: string;
  likes: string[];
  width: string;
  height: string;
}
interface CardProps {
  image: string;
  title: string;
  description: string;
  left: boolean;
}

interface ListProps {
  image: string;
  title: string;
  description: string;
  likes: number;
  location: string;
}

interface SearchProps {
  setStateVar: React.Dispatch<React.SetStateAction<boolean>>;

  setInputText: React.Dispatch<React.SetStateAction<string>>;

  setStateRepeat: React.Dispatch<React.SetStateAction<number>>;
}
const View: NextPage<Props> = ({ data }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [favorites, setFavorites] = useState<ImageProps[]>([]);
  const [serverData, setServerData] = useState<Artist>({
    name: "",
    about: "",
    profile_image: "",
    id: "",
    likes: 0,
    images: [],
    favorites: [],
  });
  const [search, setSearch] = useState<boolean>(false);
  const [searchRepeat, setSearchRepeat] = useState(0);
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    console.log(data);
    if (data.name !== "null") setServerData(data);
    else setError(true);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      serverData.images.map((image) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchImage?table=${image.table}&uid=${image.uid}`
        )
          .then((res) => res.json())

          .then((res) => {
            if (res[0] !== undefined) setImages((prev) => [...prev, res[0]]);
          });
      });
    };
    const fetchFavorites = async () => {
      serverData.favorites.map((image) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchImage?table=${image.table}&uid=${image.uid}`
        )
          .then((res) => res.json())

          .then((res) => {
            if (res[0] !== undefined) setFavorites((prev) => [...prev, res[0]]);
          });
      });
    };

    if (serverData.name !== "") {
      fetchFavorites();
      fetchImages();
    }
  }, [serverData]);

  useEffect(() => {
    setSearchResult([]);
    if (search && inputText.length > 0) {
      setLoading(true);
      images.map((image) => {
        if (image.location.toLowerCase().includes(inputText.toLowerCase())) {
          console.log(image.name, inputText);
          setSearchResult((prev) => [...prev, image]);
        }
      });
      setLoading(false);
    }
  }, [search, searchRepeat]);

  const router = useRouter();
  return (
    <div>
      {error ? (
        <div className="fixed top-0 w-full h-[100vh] z-[200] bg-black flex flex-col items-center justify-center ">
          <p className="text-white font-righteous text-[50px] md:text-[90px]">
            Artist Not Found
          </p>
          <div
            className="hover:bg-white w-fit h-fit bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 border-[6px] border-[#1A2020] z-[300] group hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <p className="font-righteous text-white group-hover:text-[#1A2020] text-xl md:text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
              Back to Home
            </p>
          </div>
        </div>
      ) : null}
      <div className="w-full h-fit bg-[#FFFFFF]">
        <div className="mt-36 md:mt-36 h-[100svh]">
          <ImageComp
            image={data.profile_image}
            title={data.name}
            description={data.about}
            key={data.name}
            left={true}
          />
        </div>
        <h1 className="text-[#960226] font-righteous text-[50px] md:text-[90px]">
          Artist Favourites
        </h1>
        <div className="w-full h-fit bg-[#440212] mb-10">
          {favorites.length > 0 &&
            favorites.map((image, index) => {
              return (
                <ImageComp
                  image={image.location}
                  title={image.name}
                  description={image.description}
                  key={image.name}
                  left={index % 2 === 0 ? true : false}
                />
              );
            })}
        </div>
        <SearchComp
          setStateVar={setSearch}
          setInputText={setInputText}
          setStateRepeat={setSearchRepeat}
        />
        <div
          className={`${
            search
              ? "min-h-[50svh] md:min-h-[100svh] h-fit block"
              : "h-0 hidden"
          } bg-[#1A2020] w-full mt-10 flex flex-col items-center justify-center gap-10 pb-10`}
        >
          <h1 className="text-white font-dongle font-normal mt-10 text-[30px] md:text-[60px]">
            Search Result
          </h1>
          {loading ? (
            <Oval
              color="#960226"
              height={200}
              width={200}
              secondaryColor="transparent"
            />
          ) : null}
          {searchResult.length > 0 && inputText.length > 0 ? (
            searchResult.map((image, index) => {
              return (
                <ImageList
                  image={image.location}
                  title={image.name}
                  description={image.description}
                  key={index}
                  likes={image.likes.length}
                  location={image.location}
                />
              );
            })
          ) : (
            <p className="text-3xl text-white font-dongle">Not Found</p>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-5 pb-10">
          {images.length > 0 &&
            images.map((image) => {
              return (
                <ImageList
                  image={image.location}
                  title={image.name}
                  description={image.description}
                  key={image.name}
                  likes={image.likes.length}
                  location={image.location}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const ImageComp: FC<CardProps> = ({ image, title, description, left }) => {
  return (
    <div className="w-full h-[70svh] relative flex flex-col items-center justify-start gap-10 overflow-hidden rounded-lg">
      <div
        className={`absolute bottom-[10%]  ${
          left ? " left-[10%] " : " right-[10%] "
        }  md:block hidden   md:w-[550px] md:h-[400px]`}
      >
        <Image
          alt="Image"
          src={image}
          fill
          quality={100}
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <div className="w-[90vw] h-[400px] md:hidden block relative mt-10">
        <Image
          alt="Image"
          src={image}
          fill
          quality={100}
          className="object-cover rounded-lg md:hidden block "
          priority
        />
      </div>

      <div
        className={`absolute bottom-[15%] ${
          left ? " left-[40%] " : " right-[40%] "
        } font-dongle bg-transparent w-[555px] h-[327px]  flex-col items-start justify-start md:flex hidden overflow-hidden rounded-lg`}
      >
        <div className="w-full h-full opacity-60 bg-[#BEB9B9] z-10 absolute"></div>
        <h1 className="text-[70px] font-normal text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#161616] mt-2 ml-10 text-left z-20 line-clamp-4">
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
      <div className="w-[95vw] h-[4px] md:hidden block bg-slate-400"></div>
    </div>
  );
};

const ImageList: FC<ListProps> = ({
  image,
  title,
  description,
  likes,
  location,
}) => {
  return (
    <div
      className="w-[95%] h-fit relative flex flex-col md:flex-row-reverse items-center justify-center gap-10 md:gap-5 bg-[#D9D9D9] p-5 mt-10"
      id={title}
    >
      <div className={` w-[674px] h-[345px] relative md:block hidden`}>
        <Image
          alt="Image"
          src={image}
          fill
          quality={100}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="w-[90vw] h-[345px] md:hidden block relative mt-10">
        <Image
          alt="Image"
          src={image}
          fill
          quality={100}
          className="object-cover rounded-lg md:hidden block "
        />
      </div>

      <div
        className={` font-dongle bg-transparent w-[50%] h-full  flex-col items-center justify-center md:flex hidden overflow-hidden rounded-lg`}
      >
        <h1 className="text-[70px] font-bold text-black mt-2 ml-10 z-20">
          {title}
        </h1>
        <p className="text-[30px] font-normal text-[#161616] mt-2 ml-10  z-20 line-clamp-4 text-center">
          {description}
        </p>
        <p className="text-[30px] font-normal text-[#161616] mt-2 ml-10  z-20 line-clamp-4 text-center">
          Topic:{" "}
          {location.substring(
            location.indexOf("/", 8) + 8,
            location.lastIndexOf("/")
          )}
        </p>
        <div className="w-[50%] h-fit  flex-row items-center justify-start gap-1 md:flex hidden">
          <FontAwesomeIcon
            icon={faHeart as IconProp}
            className="w-[20px] h-[20px]"
          />
          <p className="text-2xl font-righteous text-[#161616] font-normal">
            {likes}
          </p>
        </div>
      </div>
      <div className="relative font-dongle bg-transparent w-full h-fit  flex-col items-center justify-start md:hidden flex">
        <h1 className="text-[50px] font-bold text-black mt-2  z-20 text-center">
          {title}
        </h1>
        <p className="text-[17px] font-normal text-[#454545] mt-2 text-center z-20 line-clamp-4 ">
          {description}
        </p>
        <div className="w-[50%] h-fit flex flex-row items-center justify-start gap-1">
          <FontAwesomeIcon
            icon={faHeart as IconProp}
            className="w-[20px] h-[20px]"
          />
          <p className="text-2xl font-righteous text-[#161616] font-normal">
            {likes}
          </p>
        </div>
      </div>

      <div className="w-[95vw] h-[4px] md:hidden block bg-slate-400"></div>
    </div>
  );
};

const SearchComp: FC<SearchProps> = ({
  setStateVar,

  setInputText,

  setStateRepeat,
}) => {
  return (
    <div className="w-full h-[120px] flex flex-col md:flex-row items-center justify-center gap-5 mt-32 md:mt-0">
      <input
        type="text"
        className="md:w-[70%] w-[80vw] h-full p-5 text-white bg-[#440212] text-[30px] md:text-[50px] font-dongle font-normal outline-none"
        placeholder="Enter Image Topic"
        onChange={(e) => setInputText(e.target.value)}
      />

      <div
        className="w-[200px] h-full flex flex-col items-center justify-center mr-5  hover:cursor-pointer group"
        onClick={() => {
          setStateRepeat((prev) => prev + 1);
          setStateVar(true);
        }}
      >
        <div className="group-hover:bg-white w-full h-full bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 border-[6px] border-[#1A2020]">
          <p className="font-righteous text-white group-hover:text-[#1A2020] text-xl md:text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
            Search
          </p>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchArtistViaName?name=${context.params.artistName}`
  );

  const jsonData = await res.json();

  var data = jsonData.length > 0 ? jsonData[0] : { name: "null" };
  return {
    props: {
      data,
    },
  };
}

export default View;
