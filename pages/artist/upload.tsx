import { IKContext, IKUpload } from "imagekitio-react";
import React, { useState, useEffect, useRef } from "react";
import Loading from "../../components/Upload/loading";
import Success from "../../components/Upload/success";
import Error from "../../components/Upload/error";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import { parseLocalStorageData } from "@/utils/artistLocalStorage";

import type { ArtistImage, Artist } from "@/utils/types";
import { reFetchArtistData } from "./manage";
import { postArtistImages } from "@/utils/postFunc";
interface Props {
  name: string;
  image: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setterValue: string;
}
function Upload() {
  const user = useUser();
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [isTopic, setIsTopic] = useState(false);
  const [artist, setArtist] = useState<Number>(0);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [images, setImages] = useState([] as ArtistImage[]);
  useEffect(() => {
    const getImages = async () => {
      const data = parseLocalStorageData();
      setImages([...data.images]);
      setArtist(data.id);
    };
    getImages();
  }, []);

  const handleError = async () => {
    if (name === "") {
      setError({
        error: true,
        message: "Name must not be Empty",
      });
      return;
    } else if (description === "") {
      setError({ error: true, message: "Description must not be Empty" });
      return;
    } else if (topic === "") {
      setError({ error: true, message: "Topic must not be Empty" });
      return;
    }

    if (buttonRef.current !== null)
      (buttonRef.current as HTMLInputElement).click();
  };

  useEffect(() => {
    const handleUpload = async () => {
      var locWidth = width;
      var locHeight = height;

      locWidth = locWidth + "px";
      locHeight = locHeight + "px";

      const id = Math.round(Math.random() * 1000);
      const value = {
        link: `https://ik.imagekit.io/arinji/${topic}/${name}`,
        table: topic.toLowerCase(),
        uid: id,
      };

      const upload = [...images, value];

      await fetch(
        `/api/uploadImage?name=${name}&description=${description}&table=${topic}&userId=${user?.id}&id=${id}&width=${locWidth}&height=${locHeight}`
      );
      if (user?.id !== undefined) await postArtistImages(user?.id, upload);
      await reFetchArtistData(user?.id);
      setLoading(false);
      setSuccess(true);
    };

    if (uploaded) handleUpload();
  }, [uploaded]);

  return (
    <div>
      <div className="pt-32 relative bg-[#440212] w-full h-fit flex flex-col items-center justify-start">
        {loading && <Loading />}
        {success && <Success />}
        {error.error && (
          <Error flag={error.error} setter={setError} message={error.message} />
        )}
        <h1 className="font-righteous text-[70px] text-white">Upload</h1>
        <div className="md:w-[80%] w-full h-full flex flex-col items-start justify-start mt-10 gap-20">
          <div className="flex flex-row items-center justify-around md:justify-evenly gap-x-2 md:gap-x-10 font-righteous w-full">
            <h3 className="text-white text-[30px] md:text-[50px] ml-5 md:ml-10 w-[20%] md:w-[40%] flex flex-col items-center md:items-start justify-center">
              Name:
            </h3>
            <input
              className="w-[60%] h-fit rounded-md outline-none text-[#121B1B] p-3 bg-white"
              type="text"
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-x-2 md:gap-x-10 font-righteous w-full">
            <h3 className="text-white text-[30px] md:text-[50px] ml-0 md:ml-10 w-full md:w-[40%] flex flex-col items-center md:items-start justify-center pb-5 md:pb-0">
              Description:
            </h3>

            <div className="bg-white h-[250px] md:w-[60%] w-[80%] flex flex-col items-center justify-center rounded-lg">
              <textarea
                className="w-full h-[200px] rounded-md outline-none text-[#121B1B] p-3 whitespace-normal"
                id="Text"
                style={{ resize: "none" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-evenly gap-x-10 font-righteous w-full pb-10">
            <h3 className="text-white text-[50px] ml-10 w-[40%] flex flex-col items-start justify-center">
              Topics:
            </h3>
            <div className=" w-full md:w-[60%] h-fit flex flex-row items-center justify-center md:justify-evenly flex-wrap gap-2 md:gap-3">
              <Card
                name="Scenery"
                image="https://ik.imagekit.io/arinji/Scenery/Scenery1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Fantasy"
                image="https://ik.imagekit.io/arinji/Fantasy/Fantasy1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Realistic"
                image="https://ik.imagekit.io/arinji/Realistic/Realistic1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="People"
                image="https://ik.imagekit.io/arinji/People/People1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Animated"
                image="https://ik.imagekit.io/arinji/Animated/Animated1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="FanArt"
                image="https://ik.imagekit.io/arinji/FanArt/FanArt1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Modern"
                image="https://ik.imagekit.io/arinji/Modern/Modern1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="StillLife"
                image="https://ik.imagekit.io/arinji/StillLife/StillLife1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Nature"
                image="https://ik.imagekit.io/arinji/Nature/Nature1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
              <Card
                name="Charcoal"
                image="https://ik.imagekit.io/arinji/Charcoal/Charcoal1.jpg"
                setter={setTopic}
                setterValue={topic}
              />
            </div>
          </div>
          <IKContext
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_LINK}
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC}
            authenticationEndpoint={`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/imageKit/getAuthEndpoint`}
          >
            <IKUpload
              fileName={name}
              folder={topic}
              useUniqueFileName={false}
              onUploadStart={() => setLoading(true)}
              onSuccess={(e) => {
                setUploaded(true);
                setWidth(e.width);
                setHeight(e.height);
              }}
              style={{ display: "none" }}
              inputRef={buttonRef}
            />
            {buttonRef && (
              <div className="w-full flex flex-col items-center justify-center pb-10">
                <div
                  className="text-center text-[50px] hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 group hover:cursor-pointer"
                  onClick={() => {
                    handleError();
                  }}
                >
                  <p className="font-righteous text-white group-hover:text-[#1A2020] text-2xl md:text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                    Choose File and Upload
                  </p>
                </div>
              </div>
            )}
          </IKContext>
        </div>
      </div>
    </div>
  );
}

const Card: React.FC<Props> = ({ name, image, setter, setterValue }) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (setterValue === name) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [setterValue]);
  return (
    <div
      className={`${
        selected ? "scale-110 " : "scale-90 "
      } w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-black rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:cursor-pointer transition-all ease-in-out duration-300`}
      onClick={() => {
        setter(name);
      }}
    >
      <Image
        alt="Image"
        src={image}
        fill
        className="object-cover absolute z-10 group-hover:scale-125 transition-all ease-in-out duration-300"
      />
      <div className="w-full h-full bg-[#171C16] opacity-60 absolute z-20" />
      <h1 className="font-righteous text-[20px] md:text-[30px] text-white z-30">
        {name}
      </h1>
    </div>
  );
};

export default Upload;
