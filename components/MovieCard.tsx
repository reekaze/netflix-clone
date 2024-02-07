import { Movie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

type MovieCardProps = {
  data: Movie;
};

const MovieCard = ({ data }: MovieCardProps) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        src={data.thumbnailUrl}
        alt="thumbnail"
        fill
      />

      <div className="opacity-0 absolute top-0 transition duration-200 z-10 delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <div className="relative w-full h-[12vw]">
          <Image
            className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md"
            src={data.thumbnailUrl}
            alt="thumbnail"
            fill
          />
        </div>
        <div className="flex flex-col gap-[1px] sm:gap-[8px] lg:gap-[10px] z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-1 sm:gap-3">
            <div
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                router.push(`/watch/${data.id}`);
              }}
            >
              <BsFillPlayFill size={30} />
            </div>

            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => openModal(data.id)}
              className="cursor-pointer ml-auto group/item w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown
                size={30}
                className="text-white group-hover/item:text-neutral-300"
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold ">
            New <span className="text-white ">2003</span>
          </p>

          <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>

          <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
