import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { useCallback, useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  posterImage: string;
  releaseYear: number | string;
}

const Movies: React.FC = () => {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState("All");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.movies);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((yr) => (
              <option value={yr} key={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || "All"} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g, i) => (
              <Button title={g} key={i} action={() => setGenre(g)} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {movies.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              posterImage={movie.posterImage}
              releaseYear={String(movie.releaseYear)} // ✅ convert to string here
            />
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Movies;
