import { IMovieList } from "../util/interface";
import MovieCard from "./movieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { IMovieListLandingPage } from "../util/interface";
import { cardNum } from "../pages/landingPage/landingPage";

// Define card per panel for calculating MovieCard width
// const card_per_carousel = 8;

type Props = {
  movies: IMovieList[];
  card_per_carousel: number;
  category: keyof IMovieListLandingPage;
  isLoading: boolean;
};

const CarouselSection = ({ movies, card_per_carousel, category, isLoading }: Props) => {
  const [scroll, setScroll] = useState(0);

  const nextPage = () => {
    if (!(scroll >= Math.ceil(movies.length % 9))) {
      setScroll((scroll) => scroll + 1);
    }
  };
  const prevPage = () => {
    if (!(scroll == 0)) {
      setScroll((scroll) => scroll - 1);
    }
  };

  // FYI inspect scroll state
  //   useEffect(()=>{
  //     console.log(scroll);
  //   },[scroll])

  // Calculate card width
  const cardWidth = window.innerWidth / (card_per_carousel + 1);

  // Calculate gap used for styling
  const gap =
    Math.round((window.innerWidth - (cardWidth * card_per_carousel) - 60) / (card_per_carousel + 1));

  //Array for looping empty div (for loading-effect component)
  const cardCountArray: number[] = [];
  for (let i = 0; i < card_per_carousel; i++) {
    cardCountArray.push(i);
  }

  return (
    <section className="mb-16 mt-10">
      <div className="text-3xl font-bold ml-10 mb-6 capitalize">
        {category} list
      </div>
      <section className="overflow-hidden relative mx-auto">
        <div
          className="overflow-hidden"
          style={{
            // width: `${window.innerWidth - (60 + gap)}px`,
            width: `${cardNum * (gap + cardWidth)}px`,
            marginLeft: `${30}px`,
          }}
        >
          <div
            className="flex transition ease-in-out duration-[750ms] relative"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${scroll * 100}%)`,
              paddingLeft: `${gap}px`,
            }}
          >
            {isLoading
              ? cardCountArray.map((num) => {
                  return (
                    <div key={num} className="bg-gray-800 w-[200px] aspect-[2/3] animate-pulse"></div>
                  );
                })
              : movies.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.title}
                      title={movie.title}
                      poster_path={movie.poster_path}
                      cardWidth={cardWidth}
                      id={movie.id}
                    />
                  );
                })}
          </div>
        </div>

        {/* Slide buttons */}

        <div className="absolute top-0 h-full left-[7px]">
          <button
            className="w-[30px] h-full flex justify-center items-center text-2xl"
            onClick={prevPage}
            disabled={isLoading}
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="absolute top-0 h-full right-[7px]">
          <button
            className="w-[30px] h-full flex justify-center items-center text-2xl"
            onClick={nextPage}
            disabled={isLoading}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </section>
  );
};

export default CarouselSection;
