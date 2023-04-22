import "@/styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { Brokman } from "../fonts/Brokman";
import {
  laila,
  righteous,
  hammersmith_one,
  dongle,
} from "../fonts/googleFonts";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    })
  );

  return (
    <div
      className={`${Brokman} ${righteous.variable} ${hammersmith_one.variable} ${laila.variable} ${dongle.variable}`}
    >
      <Navbar />
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </div>
  );
}

export default MyApp;
