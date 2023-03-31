import { supabaseClient } from "./supabaseClient";

export const getData = async ({ userId, token }) => {
  const supabase = await supabaseClient(token);
  const { data: data, error } = await supabase.from("artists").select("email");

  return data;
};
