import ImageKit from "imagekit-javascript";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  urlEndpoint: "https://ik.imagekit.io/arinji",
});
