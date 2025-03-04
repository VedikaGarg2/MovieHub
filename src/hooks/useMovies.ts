import useData from "./useData";
import { GameQuery } from "../App";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    genre_ids: number[];
    popularity: number;
    release_date: string;
  }


  const useMovies = (gameQuery: GameQuery) => {
    // Fetch all movies without filtering on the server side.
    const { data, error, isLoading } = useData<Movie>('/movie/popular', {}, [gameQuery.genre?.id]);
    
    // Filter movies locally based on selectedGenre's id if one is selected.
    const filteredMovies = gameQuery.genre
      ? data.filter((movie) => movie.genre_ids.includes(gameQuery.genre!.id))
      : data;
  
    return { data: filteredMovies, error, isLoading };
  };
  
  export default useMovies;