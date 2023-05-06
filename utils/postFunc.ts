import { imageKit } from "./imagekitClientInit";
import { supabase } from "./supabaseClient";
import { ArtistImage } from "./types";

export const postName = async (name: string, user_id: any) => {
  const { error, data } = await supabase
    .from("artists")
    .update({
      name: name,
    })
    .eq("user_id", user_id);

  if (error) {
  }
};

export const postAbout = async (about: string, user_id: any) => {
  const { error, data } = await supabase
    .from("artists")
    .update({
      about: about,
    })
    .eq("user_id", user_id);

  if (error) {
  }
};

export const postImage = async (link: string, user_id: any) => {
  const { error, data } = await supabase
    .from("artists")
    .update({
      profile_image: link,
    })
    .eq("user_id", user_id);

  if (error) {
  }
};

export const postImageID = async (id: string, user_id: any) => {
  const { error, data } = await supabase
    .from("artists")
    .update({
      image_id: id,
    })
    .eq("user_id", user_id);

  if (error) {
  }
};

export const deleteArtistProfile = async (fileId: string, user_id: any) => {
  await imageKit.deleteFile(fileId);
  await supabase
    .from("artists")
    .update({
      image_id: "",
      profile_image: "",
    })
    .eq("user_id", user_id);
};

export const postEmail = async (email: string, user_id: any) => {
  await supabase
    .from("artists")
    .update({
      email: email,
    })
    .eq("user_id", user_id);
};

export const postArtistImages = async (id: string, value: ArtistImage[]) => {
  await supabase.from("artists").update({ images: value }).eq("user_id", id);
};
export const postArtistFavorites = async (id: string, value: ArtistImage[]) => {
  await supabase.from("artists").update({ favorites: value }).eq("user_id", id);
};

export const likeImage = async (id: string, table: string, value: string[]) => {
  console.log(table, id, value);
  const { data, error } = await supabase
    .from(table)
    .update({
      likes: value,
    })
    .eq("uid", id);
  if (error) console.log(error);
  return data;
};
