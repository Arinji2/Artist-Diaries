import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { Brokman } from "../fonts/Brokman";
import { laila, righteous, hammersmith_one } from "../fonts/googleFonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${Brokman} ${righteous.variable} ${hammersmith_one.variable} ${laila.variable}`}
    >
      <Navbar />

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
