/* eslint-disable react-hooks/exhaustive-deps */
import {
  parseLocalStorageData,
  verifyArtist,
  reFetchArtistData,
} from "@/utils/artistLocalStorage";
import { fetchImageData } from "@/utils/fetchFunc";
import { postAbout, postName } from "@/utils/postFunc";
import type { Image as Item, Artist } from "@/utils/types";
import { faEdit, faCheck } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface ChildProps {
  artist: Artist | null;
}

const getImageData = async (table: string, uid: string) => {
  const response = await fetchImageData(table, uid);
  return response;
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
      <Images artist={artist} />
    </div>
  );
}

const PersonalInfo: React.FC<ChildProps> = ({ artist }) => {
  const router = useRouter();
  const user = useUser();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState<string>("");
  const [editAbout, setEditAbout] = useState(false);
  const [about, setAbout] = useState<string>("");

  return (
    <div className="w-full md:w-[70%] h-fit bg-[#440212] flex flex-col items-center md:items-start justify-center rounded-lg shadow-lg shadow-black relative">
      <FontAwesomeIcon
        icon={faEdit as IconProp}
        className="w-[40px] h-[40px] text-white absolute right-10 top-40 md:top-10"
        onClick={() => setEditName(true)}
      />
      <h2 className="font-righteous text-white text-[40px] md:mt-0 mt-20 md:ml-10 p-5">
        Personal Info:{" "}
      </h2>
      {editName ? (
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
            className="w-[40px] h-[40px] text-green-400 absolute right-32 top-40 md:top-10 "
            onClick={async () => {
              if (name === "") {
                setEditName(false);
                return;
              }
              const id = user?.id;
              await postName(name, id);
              await reFetchArtistData(id);
              router.reload();
            }}
          />
        </div>
      ) : (
        <h3 className="text-[30px] font-righteous text-white md:ml-32 p-5">
          Name: <span className="text-[#BD4C67]">{artist?.name}</span>
        </h3>
      )}
      <FontAwesomeIcon
        icon={faEdit as IconProp}
        className="w-[40px] h-[40px] text-white absolute right-10 top-64 md:top-44"
        onClick={() => setEditAbout(true)}
      />

      {editAbout ? (
        <div className="flex flex-row items-center justify-center md:justify-start w-full ">
          <h3 className="text-[30px] font-righteous text-white md:ml-32 p-5">
            About:
          </h3>
          <input
            type="text"
            className="w-[40%] h-[40px] ml-5 outline-none rounded-lg text-black p-4 font-righteous text-[20px]"
            placeholder="New Name.."
            onChange={(e) => setAbout(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faCheck as IconProp}
            className="w-[40px] h-[40px] text-green-400 absolute right-32 top-64 md:top-44 "
            onClick={async () => {
              if (about === "") {
                setEditAbout(false);
                return;
              }
              const id = user?.id;
              await postAbout(about, id);
              await reFetchArtistData(id);
              router.reload();
            }}
          />
        </div>
      ) : (
        <h3 className="text-[30px] font-righteous text-white md:ml-32 p-5 text-center md:text-left">
          About:{" "}
          <span className="text-[#BD4C67] line-clamp-1">{artist?.about}</span>
        </h3>
      )}
    </div>
  );
};
export default Manage;

const Favorites: React.FC<ChildProps> = ({ artist }) => {
  interface Props {
    data: Item;
  }
  const [favoritesArray, setFavoritesArray] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState(false);
  useEffect(() => {
    if (artist === null || undefined) return;
    if (artist.favorites == null || artist.favorites.length == 0) {
      setFavorites(true);
      return;
    }
    if (!favorites) {
      artist.favorites.forEach((favorite) => {
        const data = getImageData(favorite?.table, favorite?.uid.toString());
        data.then((res) => {
          setFavoritesArray((prev) => [...prev, res]);
        });
      });
    }
  }, [artist]);

  const Cards: React.FC<Props> = ({ data }) => {
    return (
      <div className="w-[250px] h-[400px] bg-[#440212] shadow-lg shadow-black rounded-lg flex flex-col items-center justify-start font-righteous gap-5 relative text-ellipsis overflow-hidden">
        <div className="w-full h-[70%] relative">
          <Image
            alt={"Favorite"}
            src={data.location}
            fill
            quality={100}
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl text-white line-clamp-1 shrink-0">
          Name: <span className="text-[#BD4C67] ">{data.name}</span>
        </h1>
        <h2 className="text-lg text-white line-clamp-1 shrink-0">
          Description:{" "}
          <span className="text-[#BD4C67] ">{data.description}</span>
        </h2>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[200px] h-fit">
      <h2 className="text-[50px] md:text-[60px] font-righteous text-[#960226] mt-32">
        Favorites
      </h2>
      <div className="flex flex-row items-center justify-evenly w-full shrink-0 pb-10 flex-wrap gap-5">
        {!favorites ? (
          favoritesArray.map((favorite) => {
            return <Cards data={favorite} key={favorite.location} />;
          })
        ) : (
          <h1 className="text-5xl font-righteous text-black">-------</h1>
        )}
      </div>
    </div>
  );
};

const Images: React.FC<ChildProps> = ({ artist }) => {
  const router = useRouter();
  interface Props {
    data: Item;
    index: number;
  }
  const [imagesArray, setImagesArray] = useState<Item[]>([]);
  const [tablesArray, setTablesArray] = useState<String[]>([]);
  useEffect(() => {
    if (artist === null || undefined) return;
    if (artist.images == null) {
      router.push("/artist/dashboard");
      return;
    }

    artist.images.forEach(async (image) => {
      const data = getImageData(image.table, image.uid.toString());

      data.then((data) => {
        if (data !== undefined) setImagesArray((prev) => [...prev, data]);

        const string = data.location.split("/")[4];
        setTablesArray((prev) => [...prev, string]);
      });
    });
  }, [artist]);

  const Cards: React.FC<Props> = ({ data, index }) => {
    return (
      <Link href={`${tablesArray[index]}/${data.uid}`}>
        <div className="w-[250px] h-[500px] bg-[#440212] shadow-lg shadow-black rounded-lg flex flex-col items-center justify-start font-righteous gap-5 relative text-ellipsis overflow-hidden group hover:cursor-pointer">
          <div className="w-full h-[70%] relative overflow-hidden">
            <Image
              alt={"Favorite"}
              src={data.location}
              fill
              quality={100}
              className="object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
            />
          </div>

          <h1 className="text-2xl text-white line-clamp-1 shrink-0">
            Name: <span className="text-[#BD4C67] ">{data.name}</span>
          </h1>
          <h2 className="text-lg text-white line-clamp-1 shrink-0">
            Description:{" "}
            <span className="text-[#BD4C67] ">{data.description}</span>
          </h2>
          <h3 className="text-md text-white line-clamp-1 shrink-0">
            Table: <span className="text-[#BD4C67] ">{tablesArray[index]}</span>
          </h3>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full min-h-[100svh] h-fit bg-[#960226] flex flex-col items-center justify-start">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#D9D9D9] mt-20">
        Images
      </h1>
      <p className="text-[20px] md:text-[30px] font-righteous text-[#D9D9D9]">
        Click for Detailed View
      </p>
      <div className="flex flex-row items-center justify-evenly w-full shrink-0 pb-10 flex-wrap gap-5">
        {imagesArray.map((favorite, i) => {
          return <Cards data={favorite} key={favorite.location} index={i} />;
        })}
      </div>
    </div>
  );
};
