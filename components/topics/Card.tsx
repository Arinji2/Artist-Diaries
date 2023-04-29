import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import type { Image as ImageType } from "@/utils/types";

interface CardProps {
  item: ImageType;
  tableName: string;
}

export const Card: React.FC<CardProps> = ({ item, tableName }) => {
  const [widthLoc, setWidthLoc] = useState<string>("");
  const [heightLoc, setHeightLoc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Link href={`/topics/${tableName}/${item.uid}`}>
      <div
        className={`flex w-[90vw] h-[400px] md:w-[450px]  md:h-[450px]  flex-col items-center justify-start  overflow-hidden m-5 group relative rounded-lg hover:cursor-pointer`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Oval
              color="#960226"
              secondaryColor="transparent"
              strokeWidth={2}
              height={350}
              width={350}
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
