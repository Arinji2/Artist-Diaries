export interface Image {
  uid: number;
  name: string;
  location: string;
  artist: string;
  likes: string[];
  description: string;
  width: string;
  height: string;
}

export interface Error {
  message: string;
}

export interface ArtistImage {
  uid: number;
  table: string;
  link: string;
}

export interface Artist {
  id: number;
  user_id: string;
  name: string;
  email: string;
  images: ArtistImage[];
  favorites: ArtistImage[];
  about: string;
  profile_image: string;
  image_id: string;
}

export interface MonthlyData {
  uid: number;
  name: string;
  location: string;
  artist: string;
  likes: string[];
  description: string;
  width: string;
  height: string;
  date: string;
}
