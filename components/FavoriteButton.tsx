"use client";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import React from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

type FavoriteButtonProps = {
  movieId: string;
};

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites, data } = useFavorites();

  const isFavorite = data?.find((mov: any) => mov.id === movieId);

  const toggleFavorites = async () => {
    let res;
    if (isFavorite) {
      res = await axios.delete("/api/favorite", {
        data: {
          movieId,
        },
      });
    } else {
      res = await axios.post("/api/favorite", {
        movieId,
      });

      const updatedFavorites = res?.data?.favorite;
    }
    mutateFavorites();
  };

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
