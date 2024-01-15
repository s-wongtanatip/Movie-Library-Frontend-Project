import { useEffect, useState } from "react";
import { getMovieDetailFromId } from "../../services/services";
import { IMovieDetail } from "../../util/interface";
import MovieCard from "../../components/movieCard";
import { cardNum } from "../landingPage/landingPage";
import { useFavList } from "../../App";
import { RiHeartAddFill } from "react-icons/ri";

const MyfavPage = () => {
  const { state } = useFavList();
  const favList = state;
  const [details, setDetails] = useState<IMovieDetail[]>([]);

  const fetchDetailFunction = async (list: number[]) => {
    const results = [];
    for (const id of list) {
      const result = await getMovieDetailFromId(id);
      results.push(result.data!);
    }
    setDetails(results);
  };

  useEffect(() => {
    fetchDetailFunction(favList);
  }, [favList]);

  const cardCountArray: number[] = [];
  for (let i = 0; i < favList.length; i++) {
    cardCountArray.push(i);
  }

  return (
    <main className="my-16 mx-10 min-h-[80vh] flex flex-col">
      <div className="text-3xl font-bold mb-6 capitalize">My List</div>
      {favList.length ? (
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${cardNum}, minmax(0, 1fr))` }}
        >
          {" "}
          {details.length ? (
            <>
              {details.map((movie) => {
                return (
                  <MovieCard
                    title={movie.title}
                    poster_path={movie.poster_path}
                    card_per_carousel={cardNum}
                    id={movie.id}
                    key={movie.id}
                  />
                );
              })}
            </>
          ) : (
            <>
              {cardCountArray.map((num) => {
                return (
                  <div
                    key={num}
                    className="bg-gray-800 aspect-[2/3] animate-pulse"
                    style={{ width: `${window.innerWidth / (cardNum + 1)}px`}}
                  ></div>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center flex-auto text-center">
            <div className="text-[50px] flex justify-center mb-10">
              <RiHeartAddFill />
            </div>
            <span>
              Your list is empty... Find interesting movies on Homepage !
            </span>
          </div>
        </>
      )}
    </main>
  );
};

export default MyfavPage;
