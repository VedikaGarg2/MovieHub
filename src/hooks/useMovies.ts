import useData from "./useData";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
  }
  

const useMovies = () => useData<Movie>('/movie/popular')
export default useMovies;