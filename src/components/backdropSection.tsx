import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IMovieList } from "../util/interface";
import BackdropPoster from "./backdropPoster";
import { useEffect, useRef, useState } from "react";

interface Props {
  movies: IMovieList[];
  isLoading: boolean;
}

const BackdropSection = ({ movies, isLoading }: Props) => {
  const [randNum, setRandNum] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const movieDispNum = 5;
  const delay = 10

  // Random movie to display on backdrop
  const randomNumber = (count: number) => {
    const nums: number[] = [];
    while (nums.length < count) {
      let num = Math.floor(Math.random() * movies.length);
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    setRandNum(nums);
  };

  useEffect(() => {
    movies.length && randomNumber(movieDispNum);
  }, [movies]);

  // Auto-slide function
  const resetTimeout = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((c) => (c === movieDispNum - 1 ? 0 : c + 1));
    }, delay * 1000);
    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  const randMovieArr = randNum.map((i) => movies[i]);

  return (
    <section>
      {isLoading ? (
        <div className="w-screen aspect-[2.7] px-10 flex">
          <div className="h-[100%] aspect-[16/9] animate-pulse"></div>
          <div className="flex-grow flex flex-col justify-center ml-10">
            <span className="text-3xl font-semibold">
              <Skeleton baseColor="#1F2836" highlightColor="#ffffff10" />
            </span>
            <p className="pt-3 text-md text-gray-500">
              <Skeleton
                count={3}
                baseColor="#1F2836"
                highlightColor="#ffffff10"
              />
            </p>
            <div>
              <button className="text-sm bg-gray-700 rounded-lg px-3 py-2 mt-5 text-gray-700 disabled animate-pulse">
                Add to My List
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen overflow-scroll">
          <div
            className="flex transition ease-in-out duration-[750ms]"
            style={{
              transform: `translateX(-${(currentSlide % movieDispNum) * 100}%)`,
            }}
          >
            {randMovieArr.map((movie) => {
              return (
                <BackdropPoster
                  key={movie.title}
                  movie={movie}
                  circleBtn={movieDispNum}
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default BackdropSection;
