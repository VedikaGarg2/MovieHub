import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardComponent from "./MovieCardComponent";

const MovieGrid = () => {
  const { data, error, isLoading } = useMovies();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
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
