import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const table = req.query.table as string;
  const uid = req.query.uid as string;
  let flag = false; // Declare flag as a local variable

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchArtistUid?id=${id}&table=${table}`
    );
    const formatData = await response.json();

    if (formatData[0].artist === uid) {
      await supabase.from(table).delete().eq("uid", id);

      flag = true;
    }
  } catch (error) {
    console.error(error);
  }

  if (flag) res.status(200).json({ message: "success" });
  else res.status(200).json({ message: "failed" });
}
