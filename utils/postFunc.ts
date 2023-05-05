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
