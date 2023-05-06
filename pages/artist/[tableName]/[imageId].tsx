import { parseLocalStorageData } from "@/utils/artistLocalStorage";

import type { ArtistImage as ImageInterface, Artist } from "@/utils/types";
import { faCheck, faEdit, faTimes } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { reFetchArtistData } from "../manage";
import { useUser } from "@supabase/auth-helpers-react";
import DeleteVerComp from "@/components/manage/favorites";
import React from "react";
import type { Image as ImageDataInterface } from "@/utils/types";
import { postArtistFavorites, postArtistImages } from "@/utils/postFunc";

interface CompProps {
  oldValue: string;
  newValue: string;
  valueUpdater: (newValue: string) => void;
  table: string;
  id: string;
}

interface FavoriteProps {
  value: ImageInterface[];
  valueUpdater: (newValue: ImageInterface[]) => void;
  flag: boolean;
  flagUpdater: (newValue: boolean) => void;
  id: number;
  imageObj: ImageInterface;
  imageId: number;
}

interface DeleteProps {
  imageId: string;
  table: string;
  favoriteCheck: boolean;
  favoriteUpdater: (newValue: boolean) => void;
  valueUpdater: (newValue: ImageInterface[]) => void;
  value: ImageInterface[];
  id: number;
  name: string;
}

function ImageComp() {
  const router = useRouter();
  const [imageData, setImageData] = useState<ImageDataInterface>({
    uid: 0,
    name: "",
    location: "",
    artist: "",
    likes: [],
    description: "",
    height: "",
    width: "",
  });
  const [favoritesObj, setFavoritesObj] = useState<ImageInterface>({
    uid: 0,
    table: "",
    link: "",
  });
  const [id, setId] = useState<number>(0);
  const { tableName, imageId } = router.query;
  const [favoriteCheck, setFavoriteCheck] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [favorites, setFavorites] = useState<ImageInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [favoritesFlag, setFavoritesFlag] = useState<boolean>(false);
  const [deleteComp, setDeleteComp] = useState<boolean>(false);
  const user = useUser();
  useEffect(() => {
    const checkUser = async () => {
      if (Array.isArray(tableName) || Array.isArray(imageId)) return;

      const data = await fetch(
        `/api/fetchArtistUid?id=${imageId}&table=${tableName?.toLowerCase()}`
      );
      const formattedData = await data.json();

      if (formattedData[0].artist !== user?.id) router.push("/artist/denied");
      else fetchData();
    };

    const fetchData = async () => {
      setId(parseLocalStorageData()?.id as number);
      if (Array.isArray(tableName) || Array.isArray(imageId)) return;
      const rawData = await fetch(
        `/api/fetchImage?table=${tableName?.toLowerCase()}&uid=${imageId}}`
      );
      const jsonData = await rawData.json();
      {
        setImageData(jsonData[0]);
        setFavoritesObj({
          uid: parseInt(jsonData[0].uid),
          table: tableName?.toLowerCase() as string,
          link: jsonData[0].location,
        });
      }
    };
    if (tableName && imageId) checkUser();
  }, [tableName, imageId]);

  useEffect(() => {
    const artistResp = parseLocalStorageData() as Artist;
    if (artistResp !== null) {
      if (artistResp.favorites == null) setFavorites([]);
      else setFavorites(artistResp.favorites);
      setImages(artistResp.images);
    }
  }, []);

  useEffect(() => {
    if (favoritesFlag) setFavoriteCheck(true);
    else setFavoriteCheck(false);
  }, [favoritesFlag]);

  return (
    <React.Fragment>
      {deleteComp ? (
        <DeleteVerComp flag={deleteComp} setter={setDeleteComp} />
      ) : (
        <DeleteVerComp flag={deleteComp} setter={setDeleteComp} />
      )}
      <div className="w-full min-h-[100svh] h-fit bg-[#252424] flex flex-col items-center justify-end">
        <Image
          src={imageData?.location}
          width={300}
          height={300}
          priority
          quality={100}
          alt={imageData?.name}
          className="mt-32"
        />
        <div className="w-[60%] h-1 bg-white rounded-lg m-2 mt-5"> </div>
        <NameComp
          oldValue={imageData?.name}
          newValue={name}
          valueUpdater={setName}
          table={
            Array.isArray(tableName) ? "" : (tableName?.toLowerCase() as string)
          }
          id={Array.isArray(imageId) || imageId === undefined ? "" : imageId}
        />
        <DescriptionComp
          oldValue={imageData?.description}
          newValue={description}
          valueUpdater={setDescription}
          table={
            Array.isArray(tableName) ? "" : (tableName?.toLowerCase() as string)
          }
          id={Array.isArray(imageId) || imageId === undefined ? "" : imageId}
        />
        <div className="mt-8  p-3 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-5xl font-righteous text-white">
            Likes:{" "}
            <span className="text-[#BD4C67]">{imageData.likes.length}</span>
          </h1>
        </div>
        <FavoritesComp
          value={favorites}
          valueUpdater={setFavorites}
          flag={favoritesFlag}
          flagUpdater={setFavoritesFlag}
          id={id}
          imageId={imageData.uid}
          imageObj={favoritesObj}
        />
        <DeleteComp
          imageId={
            Array.isArray(imageId) ? "" : (imageId?.toLowerCase() as string)
          }
          table={
            Array.isArray(tableName) ? "" : (tableName?.toLowerCase() as string)
          }
          favoriteCheck={favoriteCheck}
          favoriteUpdater={setDeleteComp}
          valueUpdater={setImages}
          value={images}
          id={id}
          name={imageData.name}
        />
      </div>
    </React.Fragment>
  );
}

const NameComp: React.FC<CompProps> = ({
  oldValue,
  newValue,
  valueUpdater,
  table,
  id,
}) => {
  const [edit, setEdit] = useState(false);
  const [prevValue, setPrevValue] = useState("");

  useEffect(() => {
    setPrevValue(oldValue);
  }, [oldValue]);

  return (
    <div className="h-fit w-full">
      {edit ? (
        <div className="mt-5  p-3 flex flex-col items-center justify-center gap-4 ">
          <div className="flex flex-row items-center justify-end gap-4 w-full">
            <h1 className="text-5xl font-righteous text-white">Name:</h1>
            <input
              type="text"
              className="outline-none  bg-transparent text-[#BD4C67] font-righteous text-5xl w-[50%] text-left"
              placeholder="Name...."
              onChange={(e) => valueUpdater(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-row items-center gap-10">
            <FontAwesomeIcon
              icon={faTimes as IconProp}
              className="w-[40px] h-[40px] text-red-400"
              onClick={() => {
                setEdit(false);
              }}
            />
            <FontAwesomeIcon
              icon={faCheck as IconProp}
              className="w-[40px] h-[40px] text-green-400"
              onClick={() => {
                fetch(
                  `/api/updateImageName?id=${id}&table=${table}&name=${newValue}`
                )
                  .then(() => {
                    setPrevValue(newValue);
                    setEdit(false);
                  })
                  .catch(() => {
                    setEdit(false);
                  });
              }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-8  p-3 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-5xl font-righteous text-white">
            Name: <span className="text-[#BD4C67]">{prevValue}</span>
          </h1>
          <FontAwesomeIcon
            icon={faEdit as IconProp}
            className="w-[40px] h-[40px] text-white"
            onClick={() => {
              setEdit(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

const DescriptionComp: React.FC<CompProps> = ({
  oldValue,
  newValue,
  valueUpdater,
  table,
  id,
}) => {
  const [edit, setEdit] = useState(false);
  const [prevValue, setPrevValue] = useState("");

  useEffect(() => {
    setPrevValue(oldValue);
  }, [oldValue]);

  return (
    <div className="h-fit w-full">
      {edit ? (
        <div className="mt-5  p-3 flex flex-col items-center justify-center gap-4 ">
          \<h1 className="text-5xl font-righteous text-white">Description:</h1>
          <input
            type="text"
            className="outline-none  bg-transparent text-[#BD4C67] font-righteous text-5xl w-[50%] text-left break-words"
            placeholder="Name...."
            onChange={(e) => valueUpdater(e.target.value)}
          ></input>
          <div className="flex flex-row items-center gap-10">
            <FontAwesomeIcon
              icon={faTimes as IconProp}
              className="w-[40px] h-[40px] text-red-400"
              onClick={() => {
                setEdit(false);
              }}
            />
            <FontAwesomeIcon
              icon={faCheck as IconProp}
              className="w-[40px] h-[40px] text-green-400"
              onClick={() => {
                fetch(
                  `/api/updateImageDescription?id=${id}&table=${table}&description=${newValue}`
                )
                  .then(() => {
                    setPrevValue(newValue);
                    setEdit(false);
                  })
                  .catch(() => {
                    setEdit(false);
                  });
              }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-8  p-3 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-5xl font-righteous text-white">Description:</h1>
          <p className="text-[#BD4C67] text-3xl w-[60%] text-center font-righteous">
            {prevValue}
          </p>
          <FontAwesomeIcon
            icon={faEdit as IconProp}
            className="w-[40px] h-[40px] text-white"
            onClick={() => {
              setEdit(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

const FavoritesComp: React.FC<FavoriteProps> = ({
  value,
  valueUpdater,
  flag,
  flagUpdater,
  id,
  imageObj,
  imageId,
}) => {
  const user = useUser();
  const [favoritesLength, setFavoritesLength] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const handleFavorites = () => {
    if (flag) {
      valueUpdater(
        value.filter((e) => e.uid != imageId || e.table != imageObj.table)
      );

      flagUpdater(false);
    } else {
      if (favoritesLength) return;
      valueUpdater([...value, imageObj]);
      flagUpdater(true);
    }
  };

  useEffect(() => {
    const updateFavorites = async () => {
      if (user?.id !== undefined) await postArtistFavorites(user?.id, value);
      await reFetchArtistData(user?.id);
    };
    if (id !== 0) {
      updateFavorites();
    }
  }, [value, id]);

  useEffect(() => {
    if (Array.isArray(value)) {
      value.forEach((e) => {
        if (e.uid == imageId && e.table == imageObj.table) {
          flagUpdater(true);
        }
      });
    }
  }, [value, imageId, imageObj.table]);

  useEffect(() => {
    if (value.length >= 5) setFavoritesLength(true);
  }, [value]);

  return (
    <div className="mb-3 pt-5">
      <h1
        className={`${
          flag
            ? "bg-red-400 hover:text-red-400 hover:bg-white "
            : "bg-green-400 hover:text-green-400 hover:bg-white "
        } p-3 text-white text-2xl font-righteous rounded-lg transition-all ease-in-out duration-500 hover:cursor-pointer`}
        onClick={handleFavorites}
      >
        {flag
          ? "Remove from Favorites"
          : favoritesLength
          ? "Favorites Full"
          : "Add to Favorites"}
      </h1>
    </div>
  );
};

const DeleteComp: React.FC<DeleteProps> = ({
  imageId,
  table,
  favoriteCheck,
  favoriteUpdater,
  value,
  valueUpdater,
  id,
  name,
}) => {
  const user = useUser();
  const router = useRouter();
  const [updated, setUpdated] = useState(false);

  const handleImageDelete = () => {
    if (favoriteCheck) {
      favoriteUpdater(true);
      return;
    }

    fetch(`/api/deleteImage?id=${imageId}&table=${table}&uid=${user?.id}`).then(
      (e) => {
        e.json().then((e) => {
          setUpdated(true);

          if (e.message == "success") {
            valueUpdater(
              value.filter(
                (e) => e.uid != parseInt(imageId) || e.table != table
              )
            );
          } else if (e.message == "failed") {
            router.push("/artist/denied");
          }
        });
      }
    );
  };

  useEffect(() => {
    const deleteFiles = async () => {
      if (user?.id !== undefined) await postArtistImages(user?.id, value);
      await fetch(`/api/imageKit/deleteFile?fileName=${name}`);
      await reFetchArtistData(user?.id);
      router.push("/artist/manage");
    };

    if (updated) {
      if (id !== 0) {
        deleteFiles();
      }
    }
  }, [value, id, updated]);

  return (
    <div className="mb-3 pt-5">
      <h1
        className={
          "bg-red-400 hover:text-red-400 hover:bg-white p-3 text-white text-2xl font-righteous rounded-lg transition-all ease-in-out duration-500 hover:cursor-pointer"
        }
        onClick={handleImageDelete}
      >
        Delete Image
      </h1>
    </div>
  );
};
export default ImageComp;
