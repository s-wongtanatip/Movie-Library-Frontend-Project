import { useEffect, useState } from "react";
import { getMovieDetailFromId } from "../services/services";
import { IMovieDetail } from "../util/interface";
import MovieCard from "../components/movieCard";
import { cardNum } from "./landingPage";
import { useFavList } from "../App";
import { RiHeartAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const MyfavPage = () => {
  const { favListState } = useFavList();
  const favList = favListState;
  const [details, setDetails] = useState<IMovieDetail[]>([]);

  const fetchDetailFunction = async (list: number[]) => {
    const results = [];
    for (const id of list) {
      const result = await getMovieDetailFromId(id);
      results.push(result.data!);
    }
    setDetails(results);
  };

  const cardWidth =
    window.innerWidth / (Math.floor(window.innerWidth / 200) + 1);

  const gap = (window.innerWidth - 80 - cardNum * cardWidth) / (cardNum - 1);

  useEffect(() => {
    fetchDetailFunction(favList);
  }, [favList]);

  const cardCountArray: number[] = [...Array(favList.length).keys()];

  return (
    <main className="my-16 mx-10 min-h-[80vh] flex flex-col">
      <div className="text-3xl font-bold mb-6 capitalize">My List <span className="font-light">- {favList.length}</span></div>
      {favList.length ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cardNum}, minmax(0, ${cardWidth}px))`,
            gap: `${gap}px`
          }}
        >
          {details.length ? (
            <>
              {details.map((movie) => {
                return (
                  <div
                    className="justify-self-center"
                    style={{ maxWidth: `${cardWidth}px` }}
                    key={movie.id}
                  >
                    <MovieCard
                      title={movie.title}
                      poster_path={movie.poster_path}
                      cardWidth={cardWidth}
                      id={movie.id}
                    />
                  </div>
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
                    style={{ width: `${window.innerWidth / (cardNum + 1)}px` }}
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
              <Link to="/">
                <RiHeartAddFill />
              </Link>
            </div>
            <span>
              Your list is empty . . . Find interesting movies on Homepage !
            </span>
          </div>
        </>
      )}
    </main>
  );
};

export default MyfavPage;
