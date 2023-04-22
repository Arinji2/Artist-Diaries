import { Righteous, Hammersmith_One, Laila, Dongle } from "next/font/google";

export const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Righteous",
});

export const hammersmith_one = Hammersmith_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Hammersmith",
});

export const laila = Laila({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Laila",
});

export const dongle = Dongle({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-Dongle",
});
