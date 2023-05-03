import Link from "next/link";

function Page() {
  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center gap-10 bg-[#DDDDDD]">
      <h1 className="text-6xl font-righteous text-[#960226]">
        Uh Oh!! Access Denied
      </h1>
      <Link
        href="/"
        className="group hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300"
      >
        <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
          Login
        </p>
      </Link>
    </div>
  );
}

export default Page;
