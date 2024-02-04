"use client";
import useMovieList from "@/hooks/useMovieList";
import MovieList from "./MovieList";
import useFavorites from "@/hooks/useFavorites";

type AllListProps = {};

const AllList = ({}: AllListProps) => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <div className="pb-40">
      <MovieList title="Trending Now" data={movies} />
      <MovieList title="My List" data={favorites} />
    </div>
  );
};

export default AllList;
