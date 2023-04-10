import Image from "next/image";
import Link from "next/link";

function Login() {
  return (
    <div className="w-full min-h-[100svh] h-fit flex flex-col items-center justify-start bg-[#3D4A4C] gap-10">
      <p className="text-5xl text-white font-righteous pt-36">
        Login to Artist Diaries
      </p>
      <div className="w-full h-full flex flex-row items-center justify-around flex-wrap gap-y-8">
        <Link href="/login/artist" className="h-fit w-fit hover:cursor-pointer">
          <div className="bg-black w-[254px] h-[457px] flex flex-col items-center justify-center rounded-lg overflow-hidden group relative">
            <Image
              src={"/login-Artist.jpg"}
              alt="Image"
              fill
              className="absolute object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
              priority
              quality={100}
            />
            <div className="w-full h-full bg-[#171C16] opacity-60 z-20 absolute group-hover:scale-110 transition-all ease-in-out duration-300"></div>
            <p className="relative font-righteous text-white text-4xl z-30">
              Artist Login
            </p>
          </div>
        </Link>
        <Link href="/login/user" className="h-fit w-fit hover:cursor-pointer">
          <div className="bg-black w-[254px] h-[457px] flex flex-col items-center justify-center rounded-lg overflow-hidden group relative">
            <Image
              src={"/login-User.jpg"}
              alt="Image"
              fill
              className="absolute object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
              priority
              quality={100}
            />
            <div className="w-full h-full bg-[#171C16] opacity-60 z-20 absolute group-hover:scale-110 transition-all ease-in-out duration-300"></div>
            <p className="relative font-righteous text-white text-4xl z-30">
              User Login
            </p>
          </div>
        </Link>
      </div>
      <Link
        href="/signup"
        className="w-fit h-fit group hover:cursor-pointer pb-10"
      >
        <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300">
          <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
            Sign Up Instead
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Login;
