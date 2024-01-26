import { useState } from "react";
import { IMovieList } from "../util/interface";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import AddToListBtn from "./addToListBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "original"; // [ "w92", "w154", "w185", "w342", "w500", "w780", "original" ]

type Props = {
  movie: IMovieList;
  circleBtn: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};

const BackdropPoster = ({
  movie,
  circleBtn,
  currentSlide,
  setCurrentSlide,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  let buttons = [];
  for (let i = 0; i < circleBtn; i++) {
    buttons.push(i);
  }

  return (
    <div className="min-w-[100vw] aspect-[2.7] px-10 flex">
      <Link
        to={`/detail/${movie.id}`}
        state={{ movieId: movie.id }}
        className="aspect-[16/9]"
      >
        <img
          src={`${baseUrl}${posterSize}${movie.backdrop_path}`}
          className={isLoaded ? "" : "hidden"}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
        <div
          className={`h-[100%] aspect-[16/9] bg-gray-800 animate-pulse ${
            isLoaded ? "hidden" : ""
          }`}
        ></div>
      </Link>
      <div className="flex-grow flex flex-col justify-center ml-10 relative">
        <span className="text-3xl font-semibold">
          {movie.title}
          <span className="text-sm font-normal text-gray-500 pl-3">
            {movie.release_date.slice(0, 4)}
          </span>
        </span>
        <p className="pt-3 text-md text-gray-500 hidden xl:block">{movie.overview}</p>
        <div>
          <AddToListBtn movie={movie} />
        </div>
        <div className="absolute bottom-0 w-full flex justify-center">
          <button className="text-lg flex items-center p-2 m-2 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700"
          onClick={() => {
            currentSlide === 0 ?
            setCurrentSlide(circleBtn - 1) :
            setCurrentSlide(currentSlide - 1)
          }}>
              <IoIosArrowBack />
            </button>
          <div className="flex justify-center gap-3 h-[0.7rem] self-center">
            {buttons.map((i) => {
              return (
                <button
                  key={`button-${i}`}
                  className={`w-[0.7rem] aspect-square rounded-full ${
                    currentSlide % circleBtn == i
                      ? "bg-gray-300"
                      : "bg-gray-700"
                  }`}
                  onClick={() => {
                    setCurrentSlide(i);
                  }}
                ></button>
              );
            })}
          </div>
          <button className="text-lg flex items-center p-2 m-2 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700"
          onClick={() => {
            setCurrentSlide(currentSlide + 1);
          }}>
              <IoIosArrowForward />
            </button>
        </div>
      </div>
    </div>
  );
};

export default BackdropPoster;
