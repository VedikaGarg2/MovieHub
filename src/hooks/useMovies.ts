import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
  }
  
  interface FetchMoviesResponse {
    results: Movie[];
  }

const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
         .get<FetchMoviesResponse>("/movie/popular", { signal: controller.signal })
         .then((res) => {
            setMovies(res.data.results);
            setLoading(false);
        })
         .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
        });

        return () => controller.abort();
    }, []);
    return {movies, error, isLoading};
}
export default useMovies;