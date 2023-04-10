import LoginComp from "@/components/Account/login";
import VerifyComp from "@/components/Account/verify";
import { faThumbsUp } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

interface ImagePageProps {
  imageData: any;
  artistData: { name: string };
}

interface ImageData {
  name: string;
  description: string;
  location: string;
  artist: number;
  likes: string[];
}

const ImagePage: React.FC = () => {
  const user = useUser();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<ImageData>({
    name: "",
    description: "",
    location: "",
    artist: 0,
    likes: [],
  });
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [artistData, setArtistData] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();
  const { imageId, tableName } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const imageDataFetched = await fetch(
        `/api/fetchImage?uid=${imageId}&table=${tableName}`
      );
      var imageData = await imageDataFetched.json();

      const artistDataFetched = await fetch(
        `/api/fetchArtist?id=${imageData[0].artist}`
      );
      var artistData = await artistDataFetched.json();
      setArtistData(artistData[0]);
      setLikes(imageData[0].likes.length);
      setImageData(imageData[0]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) if (imageData.likes.includes(user.id)) setLike(true);
  }, [user, imageData, like, likes]);

  const accountVerification = (path: Number) => {
    if (user) {
      if (path === 1) handleLike();
      else if (path === 0) handleUnlike();
      return;
    }
    const userLocal = localStorage.getItem("user");
    if (userLocal === null) {
      setLoggedIn(true);
      return;
    } else if (userLocal === "true") {
      setVerified(true);
      return;
    }
  };
  const handleUnlike = () => {
    const value = imageData.likes.filter((like) => like !== user?.id);
    fetch(
      `/api/updateLikes?uid=${imageId}&table=${tableName}&value=${value}`
    ).then((res) => {
      if (res.status == 200) {
        setLikes((prevLikes) => prevLikes - 1);
        setLike(false);
      }
    });
  };

  const handleLike = () => {
    const value = [...imageData.likes, user?.id];
    const { imageId, tableName } = router.query;
    fetch(
      `/api/updateLikes?uid=${imageId}&table=${tableName}&value=${value}`
    ).then((res) => {
      if (res.status == 200) {
        setLikes((prevLikes) => prevLikes + 1);
        setLike(true);
      }
    });
  };

  return (
    <div className="relative w-full min-h-[100vh] h-fit bg-[#1A2020] flex flex-col items-center justify-start">
      <LoginComp flag={loggedIn} setter={setLoggedIn} />
      <VerifyComp flag={verified} setter={setVerified} />
      <div className=" mt-36"></div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-10 md:flex-row  md:justify-evenly m-5 relative">
        {imageLoading ? (
          <div className="md:w-[500px] md:h-[500px] w-[70%] h-[300px] relative rounded-lg md:ml-5 flex flex-col items-center justify-center z-40">
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
          className={`md:w-[500px] md:h-[500px] w-[70%] h-[300px] ${
            imageLoading ? " absolute hidden" : " relative block"
          } rounded-lg md:ml-5 flex flex-col items-center justify-center transition-all ease-in-out duration-300`}
        >
          <Image
            src={imageData?.location}
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
            Name: {imageData?.name}
          </h2>
          <h3 className="text-2xl text-white font-righteous">
            Description: {imageData?.description}
          </h3>
          <h4 className="text-xl text-white font-righteous">
            Artist: {artistData?.name == "" ? "Loading" : artistData.name}
          </h4>
          <div
            className={`text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer w-fit flex flex-row items-center justify-center`}
            onClick={() => {
              if (like) accountVerification(0);
              else accountVerification(1);
            }}
          >
            <FontAwesomeIcon
              icon={faThumbsUp as IconProp}
              className={`${
                like ? "text-green-500" : "text-red-500"
              } w-[20px] h-[20px] mr-2 text-2xl`}
            />
            <p>{likes}</p>
          </div>

          <h5
            className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer"
            onClick={() => router.back()}
          >
            Back to Viewer{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ImagePageProps> = async (
  context
) => {
  const { imageId, tableName } = context.query;
  const imageDataFetched = await fetch(
    `${process.env.API_DOMAIN}/api/fetchImage?uid=${imageId}&table=${tableName}`
  );
  const imageData = await imageDataFetched.json();

  const artistDataFetched = await fetch(
    `${process.env.API_DOMAIN}/api/fetchArtist?id=${imageData[0].artist}`
  );
  var artistData = await artistDataFetched.json();
  artistData = artistData[0];

  return {
    props: {
      imageData,
      artistData,
    },
  };
};

export default ImagePage;
