import { supabase } from "./supabaseClient";

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
    return "Failed to fetch data from Supabase";
  } else {
    return data;
  }
};
