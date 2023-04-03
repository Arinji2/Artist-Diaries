import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface ImagePageProps {
  imageData: any;
  artistData: { name: string };
}

const ImagePage: NextPage<ImagePageProps> = ({ imageData, artistData }) => {
  imageData = imageData[0];

  return (
    <div className="relative w-full min-h-[100vh] h-fit bg-[#1A2020] z-40 flex flex-col items-center justify-start">
      <div className=" mt-36"></div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-10 md:flex-row  md:justify-evenly m-5 ">
        <div className="md:w-[500px] md:h-[500px] w-[70%] h-[300px] relative rounded-lg md:ml-5 flex flex-col items-end justify-end">
          <Image
            src={imageData.location}
            alt="Images"
            fill
            quality={100}
            priority
            className="object-cover rounded-lg"
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-[50%] h-[50%] gap-10">
          <h2 className="text-4xl  font-righteous text-[#960226]">
            Name: {imageData.name}
          </h2>
          <h3 className="text-2xl text-white font-righteous">
            Description: {imageData.description}
          </h3>
          <h4 className="text-xl text-white font-righteous">
            Artist: {artistData.name == "" ? "Loading" : artistData.name}
          </h4>
          <h4 className="text-2xl text-white font-righteous bg-[#960226] rounded-lg p-2 hover:cursor-pointer">
            Likes: {imageData.likes.length}
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
  const { imageId } = context.query;
  const imageDataFetched = await fetch(
    `${process.env.API_DOMAIN}/api/fetchImage?uid=${imageId}&table=scenery`
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
