import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IMovieList } from "../util/interface";
import BackdropPoster from "./backdropPoster";
import { useEffect, useRef, useState } from "react";
import { useRandNum } from "../App";

interface Props {
  movies: IMovieList[];
  isLoading: boolean;
}

const BackdropSection = ({ movies, isLoading }: Props) => {
  const { randCount, randNum } = useRandNum();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const delay = 10

  // Auto-slide function
  const resetTimeout = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((c) => (c === randCount - 1 ? 0 : c + 1));
    }, delay * 1000);
    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  return (
    <section>
      {isLoading ? (
        <section className="w-screen aspect-[2.7] px-10 flex">
          <div className="h-[100%] aspect-[16/9] bg-gray-800 animate-pulse"></div>
          <div className="flex-grow flex flex-col justify-center ml-10">
            <span className="text-3xl font-semibold">
              <Skeleton baseColor="#1F2836" highlightColor="#ffffff10" />
            </span>
            <p className="pt-3 text-md text-gray-500 hidden xl:block">
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
        </section>
      ) : (
        <div className="w-screen overflow-hidden">
          <div
            className="flex transition ease-in-out duration-[750ms]"
            style={{
              transform: `translateX(-${(currentSlide % randCount) * 100}%)`,
            }}
          >
            {randNum.map(i => movies[i]).map((movie) => {
              return (
                <BackdropPoster
                  key={movie.title}
                  movie={movie}
                  circleBtn={randCount}
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
