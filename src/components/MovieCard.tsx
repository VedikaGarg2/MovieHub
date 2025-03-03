import React from "react";
import { Movie } from "../hooks/useMovies";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  movie: Movie;
}
const MovieCard = ({ movie }: Props) => {
  const imageURL = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={imageURL} alt={movie.title} />
      <CardBody>
        <Heading fontSize="2xl">{movie.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
