import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  var value = req.query.value as string;
  var formattedValue = JSON.parse(value);
  const { data, error } = await supabase
    .from("artists")
    .update({ favorites: formattedValue })
    .eq("id", id);

  if (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
