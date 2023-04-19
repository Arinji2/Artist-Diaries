import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;
  const description = req.query.description as string;
  const table = req.query.table as string;
  const userId = req.query.userId as string;
  const id = req.query.id as string;
  const tableName = table.toLowerCase();

  const { data, error } = await supabase.from(tableName).insert({
    uid: id,
    name: name,
    description: description,
    location: `https://ik.imagekit.io/arinji/${table}/${name}`,
    likes: [],
    artist: userId,
  });

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
