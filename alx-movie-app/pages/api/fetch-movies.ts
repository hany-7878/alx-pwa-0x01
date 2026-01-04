import { MoviesProps } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { year, page, genre } = req.body;
      const date = new Date();
      const resp = await fetch(
        `https://moviesdatabase.p.rapidapi.com/titles?year=${
          year || date.getFullYear()
        }&sort=year.decr&limit=12&page=${page}&${genre ? `genre=${genre}` : ""}`,
        {
          headers: {
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.MOVIE_API_KEY!,
          },
        }
      );

      if (!resp.ok) {
        console.error(await resp.text());
        return res.status(resp.status).json({ error: "Failed to fetch movies" });
      }

      const data = await resp.json();
      const movies: MoviesProps[] = data.results || [];
      res.status(200).json({ movies });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching movies" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
