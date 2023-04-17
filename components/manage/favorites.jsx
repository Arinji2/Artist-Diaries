import { faTimes } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";

function DeleteVerComp({ flag, setter }) {
  return (
    <div
      className={`fixed w-full ${
        flag ? " h-[100svh] " : " h-0 "
      } top-0 z-[100] transition-all ease-in-out duration-300`}
    >
      <div className="w-full h-full bg-slate-500 opacity-80 absolute top-0 backdrop-blur-md z-[120]"></div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="md:w-[50%] w-[80%] md:h-[90%] h-[70%]  bg-[#960226] z-[130] rounded-lg flex flex-col items-center justify-center relative ">
          <FontAwesomeIcon
            icon={faTimes}
            className={`absolute top-20 md:top-28  left-5 ${
              flag
                ? "text-white transition-opacity duration-1000 delay-1000"
                : "text-transparent transition-opacity duration-200"
            } text-2xl cursor-pointer w-[40px] h-[40px]`}
            onClick={() => {
              setter(false);
            }}
          />
          <div className="w-full">
            <h2 className="md:text-5xl text-3xl text-white font-righteous">
              Remove image from Favorites
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteVerComp;
