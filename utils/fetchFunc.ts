import Error from "next/error";
import { supabase } from "./supabaseClient";
import { Image } from "./types";

export const fetchPaginatedData = async (table: string, offset: number) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .range(offset, offset + 4);

  if (error) {
    console.error(error);
  } else {
    return data as any;
  }
};

export const fetchStaticPaginatedData = async (
  table: string,
  offset: number
) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .range(offset, offset + 2);

  if (error) {
    console.error(error);
  } else {
    return data as any;
  }
};

export const fetchImageData = async (table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("uid", id)
    .single();

  if (error) console.error(error);

  return data as Image;
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

export const fetchMonthlyData = async (mode: string) => {
  const { data } = await supabase.from("monthly").select("*").eq("mode", mode);
  return data;
};
