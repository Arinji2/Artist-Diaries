import Head from "next/head";
import Image, { ImageProps } from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TopicsTypes {
  title: string;
  image1: string;
  image2: string;
  image3: string;
  location: string;
}

interface PeopleTypes {
  title: string;
  image: string;
  location: string;
}
export default function Home() {
  function Hero() {
    return (
      <div className="h-[100svh] w-full flex flex-col items-center justify-center relative bg-[#0B1A20]">
        <Image
          src={"/hero.jpg"}
          quality={100}
          fill
          priority
          alt="Hero Image"
          className="absolute z-10 object-cover"
        ></Image>
        <div className="w-full h-full bg-[#171C16] opacity-60 z-20 absolute"></div>
        <div className="w-full h-[100svh] flex flex-col items-center justify-center z-30 text-center">
          <h1 className="font-brokman text-[80px] md:text-[100px] text-white font-bold ">
            Artist Diaries
          </h1>
          <p className="font-brokman text-[20px] md:text-[30px] text-white">
            Art Showcasing Reimagined
          </p>
          <div className="w-fit h-fit group absolute bottom-10 hover:cursor-pointer">
            <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
              <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                Start Painting
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function Choices() {
    return (
      <div className="w-full h-fit md:h-[100svh] flex flex-col items-center justify-start bg-[#D9D9D9]">
        <h2 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-16">
          Choices of the Month
        </h2>
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-[50%] w-full h-[400px] md:h-full flex flex-col items-center justify-center relative group overflow-hidden hover:cursor-pointer">
            <Image
              src={"/choices1.jpg"}
              fill
              className="absolute z-10 object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
              alt="choice image"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              {...(Image as any).defaultImageProps}
            />
            <div className="opacity-60 absolute z-20 bg-[#171C16] w-full h-full"></div>
            <h2 className="font-righteous text-[40px] md:text-[60px] text-white z-30">
              Artist of the Month
            </h2>
          </div>
          <div className="md:w-[50%] w-full h-[400px] md:h-full flex flex-col items-center justify-center relative group overflow-hidden hover:cursor-pointer">
            <Image
              src={"/choices2.jpg"}
              fill
              className="absolute z-10 object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
              alt="choice image"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              {...(Image as any).defaultImageProps}
            />
            <div className="opacity-60 absolute z-20 bg-[#171C16] w-full h-full"></div>
            <h2 className="font-righteous text-[40px] md:text-[60px] text-white z-30">
              Art of the Month
            </h2>
          </div>
        </div>
      </div>
    );
  }
  function TopicGroup() {
    return (
      <div className="w-full h-fit min-h-[100svh] bg-[#D9D9D9] flex flex-col items-center justify-start gap-y-10 pb-5">
        <h2 className="mt-20 text-[#960226] font-righteous md:text-[70px] text-[50px]">
          Search By Topic
        </h2>
        <Topics
          title="Scenery"
          image1="/Topics/Scenery1.jpg"
          image2="/Topics/Scenery2.jpg"
          image3="/Topics/Scenery3.jpg"
          location="/scenery"
        />
        <Topics
          title="Fantasy"
          image1="/Topics/Fantasy1.jpg"
          image2="/Topics/Fantasy2.jpg"
          image3="/Topics/Fantasy3.jpg"
          location="/fantasy"
        />
        <Topics
          title="Realistic"
          image1="/Topics/Realistic1.jpg"
          image2="/Topics/Realistic2.jpg"
          image3="/Topics/Realistic3.jpg"
          location="/realistic"
        />
        <Topics
          title="People"
          image1="/Topics/People1.jpg"
          image2="/Topics/People2.jpg"
          image3="/Topics/People3.jpg"
          location="/people"
        />
      </div>
    );
  }

  function Topics(data: TopicsTypes) {
    const { title, image1, image2, image3, location } = data;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [justify, setJustify] = useState(" justify-evenly");

    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const hasScrollbar = container.scrollWidth > container.clientWidth;
        setJustify(hasScrollbar ? " justify-start" : " justify-evenly");
        console.log(container.scrollWidth);
      }
    };

    useEffect(() => {
      handleScroll();
    }, []);

    return (
      <div
        className={`w-full h-[200px] bg-[#440212] flex flex-row items-center relative overflow-x-auto gap-x-5 ${justify}`}
        id="Images"
        ref={containerRef}
      >
        <h3 className="text-[#F9F9F9] font-righteous text-[30px] shrink-0 ml-5 md:w-[10%] w-[40%]">
          {title}
        </h3>
        <div className="h-[90%] w-[4px] bg-white shrink-0"></div>
        <div className="bg-transparent w-[314px] h-[180px] relative shrink-0">
          <Image
            alt="Image 1"
            src={image1}
            fill
            quality={100}
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            {...(Image as any).defaultImageProps}
            blurDataURL="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"
          />
        </div>
        <div className="bg-transparent w-[314px] h-[180px] relative shrink-0">
          <Image
            alt="Image 2"
            src={image2}
            fill
            quality={100}
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            {...(Image as any).defaultImageProps}
            blurDataURL="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"
          />
        </div>
        <div className="bg-transparent w-[314px] h-[180px] relative shrink-0">
          <Image
            alt="Image 3"
            src={image3}
            fill
            quality={100}
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            {...(Image as any).defaultImageProps}
            blurDataURL="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"
          />
        </div>
        <Link href={location}>
          <div className="flex flex-col items-center justify-center text-white w-[50px] h-[50px] mr-5 shrink-0 hover:scale-125 transition-all ease-in-out duration-500">
            <FontAwesomeIcon
              icon={faChevronRight as IconProp}
              className="text-white"
            />
            <p className="font-righteous">See All</p>
          </div>
        </Link>
      </div>
    );
  }
  function People() {
    return (
      <div className="w-full h-fit bg-[#D9D9D9] flex flex-col items-center justify-start gap-y-10 pb-10">
        <h2 className="mt-20 text-[#960226] font-righteous md:text-[70px] text-[50px]">
          Meet the People
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly w-full h-full gap-y-10">
          <PeopleComponent
            title="Artists"
            image="/artists.jpg"
            location="/artists"
          />
          <PeopleComponent title="Staff" image="/staff.jpg" location="/staff" />
          <PeopleComponent
            title="Supporters"
            image="/supporters.jpg"
            location="/supporters"
          />
        </div>
      </div>
    );
  }

  function PeopleComponent(data: PeopleTypes) {
    const { title, image, location } = data;
    return (
      <Link href={location}>
        <div className="flex flex-col items-center justify-center w-[320px] h-[453px] bg-black rounded-lg relative group overflow-hidden hover:cursor-pointer">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover absolute rounded-lg group-hover:scale-110 transition-all ease-in-out duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            {...(Image as any).defaultImageProps}
          />
          <div className="h-full w-full bg-[#171C16] opacity-60 z-20 rounded-lg group-hover:scale-110 transition-all ease-in-out duration-500 absolute"></div>
          <h3 className="font-righteous z-30 text-white text-[60px] relative">
            {title}
          </h3>
        </div>
      </Link>
    );
  }

  function End() {
    return (
      <div className="w-full h-[100svh] flex flex-col items-center justify-center relative">
        <Image
          src={"/end.jpg"}
          alt={"end"}
          fill
          quality={100}
          priority
          className="object-cover absolute"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          {...(Image as any).defaultImageProps}
        />

        <h3 className="font-righteous z-30 text-white text-[60px] relative">
          What are you waiting for?
        </h3>

        <div className="w-fit h-fit group absolute bottom-10 hover:cursor-pointer">
          <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
            <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
              Start Painting
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Artist Diaries</title>
        <meta name="description" content="Art Showcasing Reimagined" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://artistdiaries.arinji.me/public/hero.jpg"
        ></meta>
        <meta
          property="og:title"
          content="Artist Diaries - Art Showcasing Reimagined"
        />
        <meta
          property="og:description"
          content="Artist Diaries is a platform for artists to showcase their work and connect with other creatives. Join our community today!"
        />
        <meta name="author" content="Arinjii" />

        <link rel="icon" href="/logo.png" />
      </Head>
      <Hero />
      <Choices />
      <TopicGroup />
      <People />
      <End />
    </>
  );
}
