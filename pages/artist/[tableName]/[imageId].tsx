import { faCheck, faEdit, faTimes } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface Item {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}

interface CompProps {
  oldValue: string;
  newValue: string;
  valueUpdater: (newValue: string) => void;
  table: string;
  id: string;
}

function ImageComp() {
  const router = useRouter();
  const [imageData, setImageData] = useState<Item>({
    uid: 0,
    name: "",
    location: "",
    artist: 0,
    likes: 0,
    description: "",
  });
  const { tableName, imageId } = router.query;

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      if (Array.isArray(tableName) || Array.isArray(imageId)) return;
      const rawData = await fetch(
        `/api/fetchImage?table=${tableName?.toLowerCase()}&uid=${imageId}}`
      );
      const jsonData = await rawData.json();
      setImageData(jsonData[0]);
    };
    if (tableName && imageId) fetchData();
  }, [tableName, imageId]);

  return (
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
    </div>
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

export default ImageComp;
