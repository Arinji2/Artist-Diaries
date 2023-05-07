/* eslint-disable react-hooks/exhaustive-deps */
if (typeof window !== "undefined") import("@lottiefiles/lottie-player");
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Success() {
  const [isMobile, setIsMobile] = React.useState(false);
  const animation = React.useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (animation.current) {
      animation.current.addEventListener("complete", () => {
        router.push("/artist/dashboard");
      });
    }
  }, []);
  const router = useRouter();

  return (
    <div className=" z-[100] w-full h-[100svh] fixed flex flex-col items-center justify-center top-0 bg-[#440212]">
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_o3kwwgtn.json"
        background="#440212"
        speed="1"
        style={{
          width: isMobile ? "500px" : "600px",
          height: isMobile ? "500px" : "600px",
        }}
        ref={animation}
        autoplay
      />
    </div>
  );
}

export default Success;
