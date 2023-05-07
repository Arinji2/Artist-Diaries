import {
  parseLocalStorageData,
  verifyArtist,
} from "@/utils/artistLocalStorage";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";

interface ScrollProps {
  scroll: boolean;
  navBarProps: NavBarProps[];
}

interface NavProps {
  scroll: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavBarProps {
  name: string;
  link: string;
}

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [nav, setNav] = useState(false);
  const [artist, setArtist] = useState(false);
  const [navBarProps, setNavBarProps] = useState([
    {
      name: "Explore",
      link: "/explore",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Showcase",
      link: "/showcase",
    },
  ]);
  useEffect(() => {
    const handleScroll = () => {
      var offset = window.scrollY;
      var isMainPage = window.location.pathname === "/";

      if (isMainPage) {
        if (offset > 100) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      } else {
        setScroll(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleChange = () => {
      const data = verifyArtist();
      const res = parseLocalStorageData();
      if (data)
        setNavBarProps([
          {
            name: "Manage",
            link: "/artist/manage",
          },
          {
            name: "Upload",
            link: "/artist/upload",
          },
          {
            name: "View",
            link: `/artist/view/${res?.name}`,
          },
        ]);
      else
        setNavBarProps([
          {
            name: "Topics",
            link: "#topicGroup",
          },
          {
            name: "Choices",
            link: "#choiceGroup",
          },
          {
            name: "People",
            link: "#peopleGroup",
          },
        ]);
    };
    handleChange();

    window.addEventListener("artistUpdated", handleChange);

    return () => {
      window.addEventListener("artistUpdated", handleChange);
    };
  }, []);

  return (
    <>
      <PcNavBar scroll={scroll} navBarProps={navBarProps}></PcNavBar>
      <MobileNavBar scroll={scroll} setNav={setNav}></MobileNavBar>
      {nav ? (
        <div className="bg-black z-[1000] w-full h-[100vh] fixed top-0 overflow-y-scroll transition-all ease-in-out duration-700 flex flex-col items-center justify-start">
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
            <Link
              href={navBarProps[0].link}
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
                {navBarProps[0].name}
                <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
              </div>
            </Link>
            <Link
              href={navBarProps[1].link}
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
                {navBarProps[1].name}
                <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
              </div>
            </Link>
            <Link
              href={navBarProps[2].link}
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
                {navBarProps[2].name}
                <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center h-[30%] ">
            <Link
              href={"/login"}
              className="w-fit h-fit group"
              onClick={() => {
                setNav(false);
              }}
            >
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
  const navBarProps = props.navBarProps;
  return (
    <>
      <div
        className={`${
          scroll ? "bg-black " : "bg-transparent "
        }w-full h-[15vh] md:flex fixed flex-row items-center justify-between hidden top-0 transition-all ease-in-out duration-300 z-[1000] scroll-smooth`}
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
          <Link href={navBarProps[0].link}>
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              {navBarProps[0].name}
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
          </Link>
          <Link href={navBarProps[1].link}>
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              {navBarProps[1].name}
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
          </Link>
          <Link href={navBarProps[2].link}>
            <div className="w-fit flex flex-col items-center justify-center group hover:cursor-pointer">
              {navBarProps[2].name}
              <div className="w-full h-[4px] bg-transparent group-hover:bg-white group-hover:scale-x-100 scale-x-0 transition-all ease-in-out duration-500 origin-left"></div>
            </div>
          </Link>
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
