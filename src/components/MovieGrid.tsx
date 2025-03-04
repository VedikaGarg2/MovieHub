import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardComponent from "./MovieCardComponent";
import { Genre } from "../hooks/useGenres";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const MovieGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useMovies(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  const sortedMovies = [...data].sort((a, b) => {
    const sortOrder = gameQuery.sortOrder;
    if (!sortOrder) return 0; // if empty, keep original order (relevance)

    // Determine order direction: if sortOrder starts with '-', it's descending.
    const isDesc = sortOrder.startsWith("-");
    const key = isDesc ? sortOrder.substring(1) : sortOrder;

    // For numeric sorting fields: popularity and vote_average
    if (key === "popularity" || key === "vote_average") {
      return isDesc ? b[key] - a[key] : a[key] - b[key];
    }

    // For release_date: convert string to Date
    if (key === "release_date") {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      return isDesc ? dateB - dateA : dateA - dateB;
    }

    // For sorting by title (alphabetical)
    if (key === "name") {
      return isDesc
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding={10}
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <MovieCardComponent key={skeleton}>
              <MovieCardSkeleton />
            </MovieCardComponent>
          ))}
        {sortedMovies.map((movie) => (
          <MovieCardComponent key={movie.id}>
            <MovieCard movie={movie} />
          </MovieCardComponent>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
