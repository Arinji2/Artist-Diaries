import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import type { NextPage } from "next";

interface Item {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}

const Scenery: NextPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState({} as Item);
  const tableName = "scenery";
  const [fetching, setFetching] = useState<boolean>(false);

  async function fetchData() {
    setFetching(true);
    console.log(offset);
    const res = await fetch(
      `/api/fetchTopics?table=${tableName}&offset=${offset}`
    );
    var newData = await res.json();

    console.log(newData);
    setData((prevData) => [...prevData, ...newData]);
    setOffset((prevOffset) => prevOffset + 5);
    setLoading(true);
    setFetching(false);
  }

  useEffect(() => {
    console.log(fetching);
  }, [fetching]);

  const endOfPageRef = useRef(null);
  const intersection = useIntersection(endOfPageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    console.log("detected");

    if (intersection && intersection.isIntersecting && !fetching) {
      fetchData();
    }
  }, [intersection]);

  return (
    <div className="min-h-[100svh] h-fit w-full flex flex-col items-center justify-center text-black bg-[#D9D9D9]">
      <h1
        className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-16"
        onClick={fetchData}
      >
        Scenery
      </h1>
      {selected.name != undefined ? (
        <Selection item={selected} updater={setSelected} />
      ) : (
        <></>
      )}
      <div className="w-full h-full flex flex-row flex-wrap items-center justify-evenly gap-5">
        {data.map((item) => (
          <Card key={item.uid} item={item} updater={setSelected} />
        ))}
      </div>
      <div ref={endOfPageRef}>
        <p className="text-3xl font-righteous text-[#960226]">
          {loading ? "End of Page" : "Loading"}
        </p>
      </div>
    </div>
  );
};

interface CardProps {
  item: Item;
  updater: React.Dispatch<React.SetStateAction<any>>;
}

interface SelectionProps {
  item: Item;
  updater: React.Dispatch<React.SetStateAction<any>>;
}
const Card: React.FC<CardProps> = ({ item, updater }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div
      className="flex flex-col items-center justify-start w-[300px] h-[300px] overflow-hidden m-5 group relative rounded-lg hover:cursor-pointer"
      onClick={() => {
        updater(item);
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="loading icon"
            className="w-30 h-30 text-gray-400"
          />
        </div>
      )}

      <Image
        src={item.location}
        alt="Images"
        quality={100}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        {...(Image as any).defaultImageProps}
        className={`absolute object-cover group-hover:scale-110 transition-all ease-in-out duration-300 rounded-lg ${
          isLoading ? "opacity-0" : ""
        }`}
        fill
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};

const Selection: React.FC<SelectionProps> = ({ item, updater }) => {
  const [artist, setArtist] = useState<string>("");
  useEffect(() => {
    fetch(`/api/fetchArtist?id=${item.artist}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data[0].name);
      });
  }, [item]);
  useEffect(() => {
    console.log(item.artist);
  }, [item]);
  return (
    <div className="fixed w-full h-[100svh] top-0 bg-[#1A2020] z-40 flex flex-col items-center justify-start">
      <div className=" mt-36"></div>
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-around m-5 ">
        <div className="flex flex-col items-center justify-center w-[60%] h-[80%] relative rounded-lg ml-5">
          <Image
            src={item.location}
            alt="Images"
            fill
            quality={100}
            priority
            className="object-cover rounded-lg"
            loading="eager"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <h2 className="text-4xl  font-righteous text-[#960226]">
            Name: {item.name}
          </h2>
          <h3 className="text-3xl text-white font-righteous">
            Description: {item.description}
          </h3>
          <h4 className="text-2xl text-white font-righteous">
            Artist: {artist == "" ? "Loading" : artist}
          </h4>
          <h4 className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer">
            Likes: {item.likes}
          </h4>
          <h5
            className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer"
            onClick={() => {
              updater({
                name: undefined,
              });
            }}
          >
            Back to Viewer{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};
export default Scenery;
