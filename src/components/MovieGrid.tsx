import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardComponent from "./MovieCardComponent";
import { Genre } from "../hooks/useGenres";

interface Props {
  selectedGenre: Genre | null;
}

const MovieGrid = ({ selectedGenre }: Props) => {
  const { data, error, isLoading } = useMovies(selectedGenre);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={4}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <MovieCardComponent key={skeleton}>
              <MovieCardSkeleton />
            </MovieCardComponent>
          ))}
        {data.map((movie) => (
          <MovieCardComponent key={movie.id}>
            <MovieCard movie={movie} />
          </MovieCardComponent>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
