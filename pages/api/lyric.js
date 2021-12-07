import { getSong } from "gnus_xyz";

export async function handler(req, res) {
  if (!req.query) return res.status(404).send({ message: "Not Found" });

  const { title, artist } = req.query;

  const data = await getSong({
    apiKey: process.env.LYRIC,
    title,
    artist,
    optimizeQuery: true,
  });

  return res.json(data);
}
