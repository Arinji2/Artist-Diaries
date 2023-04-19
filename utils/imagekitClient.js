import ImageKit from "imagekit";

export var imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_LINK,
});
