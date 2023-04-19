import type { NextApiRequest, NextApiResponse } from "next";
import { imageKit } from "@/utils/imageKitClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authEndpoint = imageKit.getAuthenticationParameters();
  res.status(200).json(authEndpoint);
}
