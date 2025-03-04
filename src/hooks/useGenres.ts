import useData from "./useData";
import cmd from "../assets/cmd.png";

export interface Genre{
    id: number;
    name: string;
    image: string;
}

const useGenres = () => {
    const { data, error, isLoading } = useData<Genre>('/genre/movie/list');
  
    // Define a single image URL for all genres
    const singleImage = cmd;  // Replace this URL with your preferred image
  
    // Add the same image to every genre
    const genresWithImages = data.map((genre) => ({
      ...genre,
      image: singleImage,  // All genres will use this single image
    }));
  
    return { data: genresWithImages, error, isLoading };
  };
  
export default useGenres;