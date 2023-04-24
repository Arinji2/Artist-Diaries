import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  width: string;
  height: string;
}

export const Card: React.FC<CardProps> = ({
  item,
  tableName,
  width,
  height,
}) => {
  const [widthLoc, setWidthLoc] = useState<string>("");
  const [heightLoc, setHeightLoc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    //check for mobile device

    var widthLoc = Number.parseInt(width);
    var heightLoc = Number.parseInt(height);

    widthLoc = Math.round(widthLoc * 0.7);
    heightLoc = Math.round(heightLoc * 0.7);

    widthLoc = Math.round(widthLoc > 1000 ? widthLoc * 0.3 : widthLoc * 0.7);
    heightLoc = Math.round(
      heightLoc > 1000 ? heightLoc * 0.3 : heightLoc * 0.7
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
  }, []);

  return (
    <Link href={`/topics/${tableName}/${item.uid}`}>
      <div
        className={`flex flex-col items-center justify-start  overflow-hidden m-5 group relative rounded-lg hover:cursor-pointer`}
        style={{
          width: widthLoc,
          height: heightLoc,
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Oval
              color="#960226"
              secondaryColor="transparent"
              strokeWidth={2}
              height={height}
              width={width}
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
