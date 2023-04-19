import type { NextApiRequest, NextApiResponse } from "next";
import { imageKit } from "../../../utils/imagekitClientInit";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authEndpoint = imageKit.getAuthenticationParameters();
  res.status(200).json(authEndpoint);
}
