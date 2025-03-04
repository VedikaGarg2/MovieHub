import useData from "./useData";
import { Genre } from "./useGenres";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    genre_ids: number[];
  }
  

  const useMovies = (selectedGenre: Genre | null) => {
    // Fetch all movies without filtering on the server side.
    const { data, error, isLoading } = useData<Movie>('/movie/popular', {}, []);
    
    // Filter movies locally based on selectedGenre's id if one is selected.
    const filteredMovies = selectedGenre 
      ? data.filter((movie) => movie.genre_ids.includes(selectedGenre.id))
      : data;
  
    return { data: filteredMovies, error, isLoading };
  };
  
  export default useMovies;