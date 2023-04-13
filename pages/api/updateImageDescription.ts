import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const table = req.query.table as string;
  var description = req.query.description as string;

  const { data, error } = await supabase
    .from(table)
    .update({ description: description })
    .eq("uid", id);

  if (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
