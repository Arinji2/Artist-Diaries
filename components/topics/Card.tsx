import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
interface Item {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}

interface CardProps {
  item: Item;
  tableName: string;
}

export const Card: React.FC<CardProps> = ({ item, tableName }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Link href={`/topics/${tableName}/${item.uid}`}>
      <div className="flex flex-col items-center justify-start w-[300px] h-[300px] overflow-hidden m-5 group relative rounded-lg hover:cursor-pointer">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Oval
              color="#960226"
              secondaryColor="transparent"
              strokeWidth={2}
              height={130}
              width={130}
            ></Oval>
          </div>
        )}

        <Image
          src={item.location}
          alt="Images"
          quality={100}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          {...(Image as any).defaultImageProps}
          className={`absolute object-cover group-hover:scale-110 transition-all ease-in-out duration-300 rounded-lg ${
            isLoading ? "opacity-0" : ""
          }`}
          fill
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </Link>
  );
};
