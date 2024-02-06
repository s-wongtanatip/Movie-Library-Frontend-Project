import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider, { Settings } from "react-slick";
import { IMovieList } from "../util/interface";
import MovieCard from "./movieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";

type Props = {
  movies: IMovieList[];
  isLoading: boolean;
  cardNum: number;
  category: string;
};

const CarouselSection = ({ movies, isLoading, cardNum, category }: Props) => {
  const card_per_carousel = Math.max(cardNum,3)
  
  const ref = useRef<Slider>(null);
  const settings: Settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: card_per_carousel,
    slidesToScroll: card_per_carousel,
    swipe: true
  };

  // Calculate card width
  const cardWidth = window.innerWidth / (card_per_carousel + 1);

  //Array for looping empty div (for loading-effect component)
  const cardCountArray: number[] = [...Array(card_per_carousel * 2).keys()];

  return (
    <section className="md:mb-16 mt-10">
      <div className="text-3xl font-bold mx-10 mb-6 capitalize whitespace-pre">
        {movies.length ? `${category} list` : ' '}
      </div>
      <section className="overflow-hidden relative mx-auto">
        <Slider {...settings} ref={ref} className="mx-10">
          {isLoading
            ? cardCountArray.map((num) => {
                return (
                  <div key={num}>
                    <div
                      className="bg-gray-800 aspect-[2/3] animate-pulse"
                      style={{
                        maxWidth: `${cardWidth}px`,
                      }}
                    ></div>
                  </div>
                );
              })
            : movies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    cardWidth={cardWidth}
                    id={movie.id}
                  />
                );
              })}
        </Slider>

        {/* Slide buttons */}

        <div className="absolute top-0 h-full left-[7px]">
          <button
            className="w-[30px] h-full flex justify-center items-center text-2xl"
            onClick={() => ref.current?.slickPrev()}
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="absolute top-0 h-full right-[7px]">
          <button
            className="w-[30px] h-full flex justify-center items-center text-2xl"
            onClick={() => ref.current?.slickNext()}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </section>
  );
};

export default CarouselSection;
