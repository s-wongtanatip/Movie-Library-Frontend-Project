import { useEffect, useState } from "react";
import { getMovieDetailFromId } from "../../services/services";
import { IMovieDetail } from "../../services/interface";
import MovieCard from "../../components/movieCard";
import { cardNum } from "../landingPage/landingPage";

const favoriteListId = [572802, 787699, 976573, 1076364, 872585];

const MyfavPage = () => {
  const [favList, setfavList] = useState<number[]>([]);
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
    fetchDetailFunction(favoriteListId);
  }, []);

  return (
    <main className="my-16 mx-10 min-h-[80vh]">
      <div className="text-3xl font-bold mb-6 capitalize">
        My List
      </div>
      <div className="grid"
      style={{ gridTemplateColumns: `repeat(${cardNum}, minmax(0, 1fr))` }}>
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
      </div>
    </main>
  );
};

export default MyfavPage;
