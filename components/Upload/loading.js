if (typeof window !== "undefined") import("@lottiefiles/lottie-player");
import React, { useEffect } from "react";

function Loading() {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="z-[100] w-full h-[100svh] fixed flex flex-col items-center justify-center top-0 bg-[#440212]">
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_lwyjptvf.json"
        background="#440212"
        speed="1"
        style={{
          width: isMobile ? "500px" : "600px",
          height: isMobile ? "500px" : "600px",
        }}
        loop
        autoplay
      />
    </div>
  );
}

export default Loading;
