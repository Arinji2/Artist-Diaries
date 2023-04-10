import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const table = req.query.table as string;
  const offset = req.query.offset as string;

  const offsetNumber = parseInt(offset);

  if (isNaN(offsetNumber)) {
    return res.status(400).json({ message: 'Invalid "offset" parameter' });
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .range(offsetNumber, offsetNumber + 4);

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
