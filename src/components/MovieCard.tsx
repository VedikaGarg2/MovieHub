import React from "react";
import { Movie } from "../hooks/useMovies";
import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
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
        <Heading fontSize="xl">{movie.title}</Heading>
        <HStack justifyContent="right">
          <CriticScore score={percentage} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
