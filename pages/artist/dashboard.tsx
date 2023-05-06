import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CardProps {
  title: string;
  image: string;
  location: string;
}
function Dashboard() {
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("artist");
    var parsedData;
    if (data !== null) parsedData = JSON.parse(data);

    if (parsedData.name == null) router.push("/artist/setup/name");
    setName(parsedData?.name);
  });
  return (
    <div className="w-full min-h-[100svh] h-fit ">
      <div className="mt-36"></div>
      <h1 className="text-[60px] font-righteous text-[#960226]">
        Welcome <span className="text-[#2C3738]">{name}</span>
      </h1>
      <div className="flex flex-row items-center justify-evenly gap-5 flex-wrap mt-10">
        <Card
          title="Manage"
          image="/Artist/manage.png"
          location="/artist/manage"
        />
        <Card
          title="Upload"
          image="/Artist/upload.png"
          location="/artist/upload"
        />
        <Card
          title="View"
          image="/Artist/view.png"
          location={`/artist/view/${name}`}
        />
      </div>
    </div>
  );
}

const Card = ({ title, image, location }: CardProps) => {
  return (
    <Link href={location}>
      <div className="w-[250px] h-[450px] bg-black overflow-hidden relative rounded-lg group hover:cursor-pointer flex flex-col items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover z-10 group-hover:scale-125 transition-all ease-in-out duration-500 absolute"
        />
        <div className="w-full h-full bg-[#1A2020] opacity-60 z-20 absolute"></div>
        <h2 className="text-5xl text-white font-righteous z-30">{title}</h2>
      </div>
    </Link>
  );
};

export default Dashboard;
