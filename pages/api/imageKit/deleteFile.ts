import { imageKit } from "@/utils/imageKitClient";
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
          console.log("Deleted");
          res.status(200).json({ message: "File Deleted" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: error });
        });
    });
}
