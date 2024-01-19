import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovieDetail, IMovieList } from "../../util/interface";
import { getMovieDetailFromId } from "../../services/services";
import CarouselSection from "../../components/carouselSection";
import { getSimilarMovieList } from "../../services/services";
import { cardNum } from "../landingPage/landingPage";
import { FaStar } from "react-icons/fa6";
import AddToListBtn from "../../components/addToListBtn";

const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "original"; // [ "w92", "w154", "w185", "w342", "w500", "w780", "original" ]

const DetailPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movieData, setMovieData] = useState<IMovieDetail>({} as IMovieDetail);
  const [similarMovList, setSimilarMovList] = useState<IMovieList[]>([]);

  const callData = async (id: number) => {
    const movieDetailResponse = await getMovieDetailFromId(id);
    const similarMovieResponse = await getSimilarMovieList(id);

    if (movieDetailResponse.data) {
      setMovieData(movieDetailResponse.data);
    }
    if (similarMovieResponse.data) {
      setSimilarMovList(similarMovieResponse.data.results);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    callData(state.movieId);
  }, [state.movieId]);

  const ratingScore = Math.round((movieData.vote_average / 2) * 100) / 100;

  return (
    <main>
      <section className="mx-auto flex min-h-[70vh] max-h-[75vh] max-w-[80vw] py-10">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Spinner/>
          </div>
        ) : (
          <>
            <div
              id="image"
              className="max-w-[25vw] flex-none flex justify-center"
            >
              <img src={`${baseUrl}${posterSize}${movieData.poster_path}`} />
            </div>
            <div
              id="detailBox"
              className="flex-grow px-20 grid grid-rows-[1fr_1fr_2.5fr] h-auto"
            >
              <div className="top-part">
                <div className="pb-3">
                  <span
                    id="ratingStars"
                    className="*:inline-block inline-flex gap-1 relative text-yellow-300 overflow-hidden"
                  >
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <div
                      className="bg-[#111111] w-full h-full absolute left-[100%] z-10"
                      style={{
                        translate: `-${((5 - ratingScore) / 5) * 100}%`,
                      }}
                    ></div>
                  </span>
                  <span className="text-yellow-400 text-lg">
                    {" "}
                    {ratingScore} / 5
                  </span>
                  <span className="font-thin text-xs pl-3">
                    ({movieData.vote_count.toLocaleString("en-US")})
                  </span>
                </div>
                <span className="text-4xl font-bold block">
                  {movieData.title}
                </span>
                <span className="font-light block">{movieData.tagline}</span>
                <span className="text-sm font-thin text-gray-500">
                  Released on {movieData.release_date}
                </span>
                <span className="text-sm font-thin ml-5 text-gray-500">
                  Runtime : {Math.floor(movieData.runtime / 60)} hr{" "}
                  {movieData.runtime % 60} min
                </span>
                <div className="font-light text-gray-500">
                  Language :{" "}
                  {movieData.spoken_languages
                    .map((lan) => lan.english_name)
                    .join(", ")}
                </div>
                <div>
                  <AddToListBtn movie={movieData} />
                </div>
              </div>
              <div className="center-part self-end">
                <p className="text-gray-200 pt-5">{movieData.overview}</p>
              </div>
              <div className="bottom-part flex flex-col justify-between">
                <div className="pt-5">
                  {movieData.genres.map((genre) => {
                    return (
                      <span className="bg-gray-700 rounded-full px-3 py-2 mr-3 font-thin text-sm">
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
                <div className="">
                  <div className="flex gap-10 justify-end text-end">
                    <ul className="text-gray-400 text-base *:text-gray-500 *:text-sm">
                      Production Country
                      {movieData.production_countries.map((country) => (
                        <li key={country.name}>{country.name}</li>
                      ))}
                    </ul>
                    <ul className="text-gray-400 text-base *:text-gray-500 *:text-sm">
                      Production Company
                      {movieData.production_companies.map((company) => (
                        <li key={company.name}>{company.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <section className="">
        <CarouselSection
          movies={similarMovList}
          card_per_carousel={cardNum}
          category="Similar Movie"
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

const Spinner = () => {
  return (
    <>
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-gray-300 animate-spin fill-gray-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default DetailPage;
