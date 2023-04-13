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
      id: "",
    };

  const jsonData: Artist = JSON.parse(rawData);
  return jsonData;
};

export const verifyArtist = () => {
  return parseLocalStorageData().id == "" ? false : true;
};
