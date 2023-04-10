import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.query.uid as string;
  const table = req.query.table as string;
  var value = req.query.value as string;
  const uidNumber = parseInt(uid);
  var arrOfValue = value.split(",");

  if (isNaN(uidNumber)) {
    return res.status(400).json({ message: 'Invalid "uid" parameter' });
  }

  const { data, error } = await supabase
    .from(table)
    .update({ likes: arrOfValue })
    .eq("uid", uidNumber);

  if (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data from Supabase" });
  } else {
    res.status(200).json(data);
  }
}
