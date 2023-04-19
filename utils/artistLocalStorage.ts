export interface Artist {
  id: Number;
  user_id: String;
  name: String;
  email: String;
  images: Image[];
  favorites: Image[];
}

export interface Image {
  location: String;
  table: String;
  uid: Number;
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
    };

  const jsonData: Artist = JSON.parse(rawData);
  return jsonData;
};

export const verifyArtist = () => {
  return parseLocalStorageData().id == 0 ? false : true;
};
