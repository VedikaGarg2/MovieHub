import React from "react";
import { Movie } from "../hooks/useMovies";
import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import CriticScore from "./CriticScore";

interface Props {
  movie: Movie;
}
const MovieCard = ({ movie }: Props) => {
  const imageURL = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
  const percentage = parseInt((movie.vote_average * 10).toFixed(0), 10);

  return (
    <Card>
      <Image src={imageURL} alt={movie.title} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Text fontSize="sm" color="gray.500">
            {movie.release_date}
          </Text>
          <CriticScore score={percentage} />
        </HStack>
        <Heading fontSize="xl">{movie.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
