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
import debounce from "lodash/debounce";

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
  width: string;
  height: string;
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
    width: "0px",
    height: "0px",
  });
  const [widthLoc, setWidthLoc] = useState<string>("0px");
  const [heightLoc, setHeightLoc] = useState<string>("0px");
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [artistData, setArtistData] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();
  const { imageId, tableName } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (imageId && tableName) {
        const imageDataFetched = await fetch(
          `/api/fetchImage?uid=${imageId}&table=${tableName}`
        );
        var imageData = await imageDataFetched.json();

        if (imageData && imageData.length > 0) {
          const artistDataFetched = await fetch(
            `/api/fetchArtist?id=${imageData[0].artist}`
          );
          var artistData = await artistDataFetched.json();
          setArtistData(artistData[0]);
          setLikes(imageData[0].likes.length);
          setImageData(imageData[0]);
        }
      }
    };

    fetchData();
  }, [imageId, tableName]);

  useEffect(() => {
    if (user) if (imageData.likes.includes(user.id)) setLike(() => true);
  }, [user, imageData]);

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
  const handleUnlike = debounce(() => {
    const value = imageData.likes.filter((like) => like !== user?.id);
    fetch(
      `/api/updateLikes?uid=${imageId}&table=${tableName}&value=${value}`
    ).then((res) => {
      if (res.status == 200) {
        setLikes((prevLikes) => prevLikes - 1);
        setLike((prevLike) => !prevLike);
      }
    });
  }, 1000);

  const handleLike = debounce(() => {
    const value = [...imageData.likes, user?.id];
    const { imageId, tableName } = router.query;
    fetch(
      `/api/updateLikes?uid=${imageId}&table=${tableName}&value=${value}`
    ).then((res) => {
      if (res.status == 200) {
        setLikes((prevLikes) => prevLikes + 1);
        setLike((prevLike) => !prevLike);
      }
    });
  }, 1000);

  useEffect(() => {
    //check for mobile device

    var widthLoc = Number.parseInt(imageData.width);
    var heightLoc = Number.parseInt(imageData.height);

    widthLoc = Math.round(widthLoc > 1000 ? widthLoc * 0.3 : widthLoc * 0.9);
    heightLoc = Math.round(
      heightLoc > 1000 ? heightLoc * 0.3 : heightLoc * 0.9
    );

    if (window.innerWidth < 768) {
      widthLoc = window.innerWidth - 50;
      heightLoc = Math.round(
        heightLoc > window.innerHeight
          ? window.innerHeight - 100
          : heightLoc * 0.7
      );
    }
    setWidthLoc(widthLoc.toString().concat("px"));
    setHeightLoc(heightLoc.toString().concat("px"));
  }, [imageData.width, imageData.height]);

  return (
    <div className="relative w-full min-h-[100vh] h-fit bg-[#1A2020] flex flex-col items-center justify-center">
      <LoginComp flag={loggedIn} setter={setLoggedIn} />
      <VerifyComp flag={verified} setter={setVerified} />
      <div className=" mt-36"></div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-10 md:flex-row  md:justify-evenly m-5 relative">
        {imageLoading ? (
          <div
            className=" relative rounded-lg md:ml-5 flex flex-col items-center justify-center z-40"
            style={{ width: widthLoc, height: heightLoc }}
          >
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
          className={` ${
            imageLoading ? " absolute hidden" : " relative block"
          } rounded-lg md:ml-5 flex flex-col items-center justify-center transition-all ease-in-out duration-300`}
          style={{ width: widthLoc, height: heightLoc }}
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

export default ImagePage;
