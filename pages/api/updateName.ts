import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;
  const id = req.query.id as string;

  const { data, error } = await supabase
    .from("artists")
    .update({ name: name })
    .eq("id", parseInt(id));

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
