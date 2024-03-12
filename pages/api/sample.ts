import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.url, req.body, req.query);
  res.json({ message: "this is from sample api" });
}
