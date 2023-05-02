import Error from "next/error";
import { supabase } from "./supabaseClient";
import { Image, Error as ErrorType } from "./types";

export const fetchPaginatedData = async (table: string, offset: string) => {
  const offsetNumber = parseInt(offset);

  if (isNaN(offsetNumber)) {
    return "Invalid offset parameter";
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .range(offsetNumber, offsetNumber + 4);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

export const fetchImageData = async (table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("uid", id)
    .single();

  if (error) {
    console.error(error);
    return Error;
  } else {
    return data as Image;
  }
};

export const fetchArtistData = async (id: string) => {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};
