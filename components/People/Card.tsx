import Image from "next/image";
import { FC } from "react";
interface CardProps {
  name: string;
  image: string;
  about: string;
}

const Card: FC<CardProps> = ({ about, image, name }) => {
  return (
    <div className="w-[300px] h-[350px] bg-black rounded-lg overflow-hidden group relative flex flex-col items-start justify-end gap-5 m-3 hover:cursor-pointer">
      <Image
        src={image}
        alt="Profile Photo"
        fill
        className="absolute z-10 object-cover group-hover:scale-125 transition-all ease-in-out duration-300"
        quality={100}
        priority
        loading="eager"
      />
      <div className="absolute z-20 opacity-40 bg-[#171C16] top-0 w-full h-full group-hover:scale-125 transition-all ease-in-out duration-300"></div>
      <h1 className="font-righteous text-white text-3xl line-clamp-1 text-left ml-4 z-30">
        {name}
      </h1>
      <h1 className="font-dongle text-white text-3xl line-clamp-1 text-left ml-4 z-30">
        {about}
      </h1>
    </div>
  );
};

export default Card;
