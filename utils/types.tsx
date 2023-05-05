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
