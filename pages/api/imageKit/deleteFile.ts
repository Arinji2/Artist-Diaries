import { imageKit } from "../../../utils/imagekitClientInit";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileName = req.query.fileName as string;

  imageKit
    .listFiles({
      name: fileName,
    })
    .then((response) => {
      imageKit
        .deleteFile(response[0].fileId)
        .then(() => {
          res.status(200).json({ message: "File Deleted" });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    });
}
