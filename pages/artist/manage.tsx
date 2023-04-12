import {
  Artist,
  parseLocalStorageData,
  verifyArtist,
} from "@/utils/artistLocalStorage";
import { faEdit, faCheck } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ChildProps {
  artist: Artist | null;
}

interface Item {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}
const getImageData = async (table: String, uid: Number) => {
  const response = await fetch(`/api/fetchImage?table=${table}&uid=${uid}`);
  const data = await response.json();
  return data as Item;
};

function Manage() {
  const router = useRouter();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    if (verifyArtist() === false) router.push("/artist/denied");
    const artistResp = parseLocalStorageData() as Artist;
    if (artistResp !== null) setArtist(artistResp);
  }, [router]);

  return (
    <div className="w-full min-h-[100svh] h-fit bg-[#D9D9D9] flex flex-col items-center justify-start">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-32">
        Manage
      </h1>
      <PersonalInfo artist={artist} />
      <Favorites artist={artist} />
    </div>
  );
}

const PersonalInfo: React.FC<ChildProps> = ({ artist }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>("");
  return (
    <div className="w-full md:w-[70%] h-fit bg-[#440212] flex flex-col items-center md:items-start justify-center rounded-lg shadow-lg shadow-black relative">
      <FontAwesomeIcon
        icon={faEdit as IconProp}
        className="w-[40px] h-[40px] text-white absolute right-10 top-5 md:top-10"
        onClick={() => setEdit(true)}
      />
      <h2 className="font-righteous text-white text-[40px] md:mt-0 mt-20 md:ml-10 p-5">
        Personal Info:{" "}
      </h2>
      {edit ? (
        <div className="flex flex-row items-center justify-center md:justify-start w-full ">
          <h3 className="text-[30px] font-righteous text-white md:ml-32 p-5">
            Name:
          </h3>
          <input
            type="text"
            className="w-[40%] h-[40px] ml-5 outline-none rounded-lg text-black p-4 font-righteous text-[20px]"
            placeholder="New Name.."
            onChange={(e) => setName(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faCheck as IconProp}
            className="w-[40px] h-[40px] text-green-400 absolute right-32 top-5 md:top-10 "
            onClick={() => {
              if (name === "") {
                setEdit(false);
                return;
              }
              const id = artist?.id?.toString();
              fetch(`/api/updateName?name=${name}&id=${id}`).then(() => {
                fetch(`/api/fetchArtist?id=${artist?.id}`)
                  .then((res) => res.json())
                  .then((data) => {
                    localStorage.setItem("artist", JSON.stringify(data));
                    router.reload();
                  });
              });
            }}
          />
        </div>
      ) : (
        <h3 className="text-[30px] font-righteous text-white md:ml-32 p-5">
          Name: <span className="text-[#BD4C67]">{artist?.name}</span>
        </h3>
      )}
    </div>
  );
};
export default Manage;

const Favorites: React.FC<ChildProps> = ({ artist }) => {
  interface Props {
    data: Item[];
  }
  const [favoritesArray, setFavoritesArray] = useState<Item[]>([]);
  useEffect(() => {
    if (artist === null || undefined) return;

    artist.favorites.forEach((favorite) => {
      const data = getImageData(favorite.table, favorite.uid);
      data.then((data) => {
        console.log(typeof data);
        setFavoritesArray((prev) => [...prev, data]);
      });
    });
  }, [artist]);

  const Cards: React.FC<Props> = ({ data }) => {
    return (
      <div className="w-[250px] h-[400px] bg-[#440212] shadow-lg shadow-black rounded-lg flex flex-col items-center justify-start font-righteous gap-5 relative text-ellipsis overflow-hidden">
        <div className="w-full h-[70%] relative">
          <Image
            alt={"Favorite"}
            src={data[0].location}
            fill
            quality={100}
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl text-white line-clamp-1 shrink-0">
          Name: <span className="text-[#BD4C67] ">{data[0].name}</span>
        </h1>
        <h2 className="text-lg text-white line-clamp-1 shrink-0">
          Description:{" "}
          <span className="text-[#BD4C67] ">{data[0].description}</span>
        </h2>
      </div>
    );
  };

  return (
    <div className="w-full h-fit">
      <h2 className="text-[50px] md:text-[60px] font-righteous text-[#960226] mt-32">
        Favorites
      </h2>
      <div className="flex flex-row items-center justify-evenly w-full shrink-0 pb-10 flex-wrap gap-y-5">
        {favoritesArray.map((favorite) => {
          return <Cards data={favorite} key={favorite[0].uid} />;
        })}
      </div>
    </div>
  );
};
