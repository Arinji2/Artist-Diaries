import type { ArtistImage } from "./types";

export interface Artist {
  id: Number;
  user_id: String;
  name: String;
  email: String;
  images: ArtistImage[];
  favorites: ArtistImage[];
  about: String;
  profile_image: String;
}

export const parseLocalStorageData = () => {
  const rawData = localStorage.getItem("artist");

  if (rawData === null)
    return {
      id: 0,
      user_id: "",
      name: "",
      email: "",
      images: [],
      favorites: [],
      about: "",
      profile_image: "",
    };

  const jsonData: Artist = JSON.parse(rawData);
  return jsonData;
};

export const verifyArtist = () => {
  return parseLocalStorageData().id == 0 ? false : true;
};
