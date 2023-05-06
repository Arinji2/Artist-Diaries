import type { Artist } from "./types";

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
      image_id: "",
    };

  const jsonData: Artist = JSON.parse(rawData);
  return jsonData;
};

export const verifyArtist = () => {
  return parseLocalStorageData().id == 0 ? false : true;
};
