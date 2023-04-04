import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
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
  likes: number[];
}

const ImagePage: React.FC = () => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<ImageData>({
    name: "",
    description: "",
    location: "",
    artist: 0,
    likes: [],
  });
  const [artistData, setArtistData] = useState<any>({});
  const router = useRouter();
  const fetchData = async () => {
    const { imageId, tableName } = router.query;
    const imageDataFetched = await fetch(
      `/api/fetchImage?uid=${imageId}&table=${tableName}`
    );
    var imageData = await imageDataFetched.json();

    const artistDataFetched = await fetch(
      `/api/fetchArtist?id=${imageData[0].artist}`
    );
    var artistData = await artistDataFetched.json();
    setArtistData(artistData[0]);
    setImageData(imageData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative w-full min-h-[100vh] h-fit bg-[#1A2020] flex flex-col items-center justify-start">
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
          <h4 className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer">
            Likes: {imageData?.likes?.length}
          </h4>
          <Link href={"/topics/scenery"}>
            <h5 className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer">
              Back to Viewer{" "}
            </h5>
          </Link>
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
