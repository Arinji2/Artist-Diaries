import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";

interface ScrollProps {
  scroll: boolean;
}

interface NavProps {
  scroll: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(!window.location.href.endsWith("#"));
      var offset = window.scrollY;
      if (!window.location.href.endsWith("/")) offset = 10000;
      else if (!window.location.href.endsWith("#")) offset = 10000;
      if (offset > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PcNavBar scroll={scroll}></PcNavBar>
      <MobileNavBar scroll={scroll} setNav={setNav}></MobileNavBar>
      {nav ? (
        <div className="bg-black z-[1000] w-full h-[100svh] fixed top-0 overflow-y-scroll transition-all ease-in-out duration-700 flex flex-col items-center justify-start">
          <div className="flex flex-row-reverse w-full justify-between items-center mt-10">
            <div>
              <FontAwesomeIcon
                icon={faTimes as IconProp}
                className="text-white w-[40px] h-[40px] mr-5"
                onClick={() => {
                  setNav(false);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[60%] gap-y-10 text-white font-righteous text-3xl">
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              <p>Explore</p>
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              <p>About</p>
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              <p>Showcase</p>
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[30%] ">
            <Link href={"login"} className="w-fit h-fit group">
              <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
                <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                  Login
                </p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-black z-[1000] w-0 h-[100svh] fixed top-0 overflow-y-scroll transition-all ease-in-out duration-700 flex flex-col items-center justify-center"></div>
      )}
    </>
  );
}

export default Navbar;

function PcNavBar(props: ScrollProps): JSX.Element {
  const scroll = props.scroll;
  return (
    <>
      <div
        className={`${
          scroll ? "bg-black " : "bg-transparent "
        }w-full h-[15vh] md:flex flex-row items-center justify-between hidden fixed top-0 transition-all ease-in-out duration-300 z-[1000]`}
      >
        <Link
          href={"/"}
          className="flex flex-row items-center justify-start w-[30%]"
        >
          <div className="flex flex-row items-center justify-start  hover:cursor-pointer">
            <div className="border-[#767D76] border-2 rounded-full ml-5 shrink-0">
              <Image
                src={"/logo.png"}
                quality={100}
                alt="Logo"
                width={40}
                height={40}
                className="m-5"
              ></Image>
            </div>

            <div className="flex flex-col items-start justify-center h-[15vh] text-left ml-5">
              <p className="font-hammersmith text-3xl text-[#767D76]">
                ARTIST DIARIES
              </p>
              <p className="font-laila text-[10px] text-[#767D76] font-medium">
                Art Showcasing Reimagined
              </p>
            </div>
          </div>
        </Link>

        <div className="flex flex-row items-center justify-evenly text-white text-2xl mr-5 w-[40%] font-righteous">
          <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>Explore</p>
            <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
          </div>
          <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>About</p>
            <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
          </div>
          <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>Showcase</p>
            <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
          </div>
        </div>
        <div className="w-[30%] h-full flex flex-col items-end justify-center mr-5  hover:cursor-pointer">
          <Link href="/login" className="w-fit h-fit group">
            <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
              <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                Login
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileNavBar(props: NavProps): JSX.Element {
  return (
    <div
      className={`${
        props.scroll ? "bg-black " : "bg-transparent "
      }w-full h-[15vh]  flex flex-row items-center justify-between md:hidden fixed top-0 z-[1000]`}
    >
      <Link href="/">
        <div className="flex flex-col items-center justify-center  rounded-full border-2 border-[#767D76] ml-5">
          <Image
            src={"/logo.png"}
            quality={100}
            alt="Logo"
            width={40}
            height={40}
            className="m-5"
          ></Image>
        </div>
      </Link>
      <div className="w-[50%] flex flex-col items-end justify-center relative">
        <FontAwesomeIcon
          icon={faBars as IconProp}
          className="w-[30px] h-[30px] text-white mr-5"
          onClick={() => {
            props.setNav(true);
          }}
        />
      </div>
    </div>
  );
}
