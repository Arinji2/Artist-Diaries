import { faTimes } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function VerifyComp({ flag, setter }) {
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
              You must Verify to Like!!
            </h2>
            <div
              className={` ${
                flag ? " w-full h-full " : " h-0 "
              } flex flex-col items-center justify-center md:mr-5  hover:cursor-pointer pt-20`}
            >
              <Link href="/signup" className="w-fit h-fit group">
                <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
                  <p
                    className={`font-righteous ${
                      flag ? " text-xl md:text-3xl " : " text-[0px] "
                    } text-white group-hover:text-[#1A2020] p-5 pl-7 pr-7 transition-all ease-in-out duration-300`}
                  >
                    Send Verification Email
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyComp;
