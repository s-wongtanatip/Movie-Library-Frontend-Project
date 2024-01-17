import { useEffect, useState } from "react";
import { useFavList } from "../App";
import { IMovieList } from "../util/interface";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

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
  setCurrentSlide
}: Props) => {
  const { state, setState } = useFavList();
  const favList = state;
  const setFavList = setState;
  const [isLiked, setIsLiked] = useState<boolean>();

  let buttons = [];
  for (let i = 0; i < circleBtn; i++) {
    buttons.push(i);
  }

  useEffect(() => {
    if (favList.includes(movie.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favList]);

  const likeUnlikeFunction = () => {
    if (isLiked) {
      setFavList(favList.filter((x) => x != movie.id));
    } else {
      setFavList([...favList, movie.id]);
    }
    setIsLiked((liked) => !liked);
  };

  return (
    <div className="min-w-[100vw] aspect-[2.7] px-10 flex">
      {movie ? (
        <img src={`${baseUrl}${posterSize}${movie.backdrop_path}`} />
      ) : (
        <div className="h-[100%] aspect-[16/9] bg-gray-800 animate-pulse"></div>
      )}
      <div className="flex-grow flex flex-col justify-center ml-10 relative">
        <span className="text-3xl font-semibold">
          {movie.title}
          <span className="text-sm font-normal text-gray-500 pl-3">
            {movie.release_date.slice(0, 4)}
          </span>
        </span>
        <p className="pt-3 text-md text-gray-500">{movie.overview}</p>
        <div>
          <button className={`text-sm rounded-lg px-3 py-2 mt-5 ${isLiked ? "bg-red-500" : "bg-gray-700"}`}
          onClick={likeUnlikeFunction}>
            <div className="flex items-center gap-2 transition duration-300 active:scale-75">
            {isLiked ? <>Added ! <FaCheckCircle /></> : <>My List <FaCirclePlus /></>}
            </div>
          </button>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex justify-center gap-3">
            {buttons.map((i) => {
              return (
                <button
                  key={`button-${i}`}
                  className={`w-[0.7rem] aspect-square rounded-full ${currentSlide % circleBtn == i ? "bg-gray-300" : "bg-gray-700" }`}
                  onClick={() => {
                    setCurrentSlide(i)
                  }}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackdropPoster;
