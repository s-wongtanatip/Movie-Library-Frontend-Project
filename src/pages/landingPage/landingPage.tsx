import { useEffect, useState } from "react";
import {
  getMovieListByGenre,
  getPopularMovieList,
} from "../../services/services";
import CarouselSection from "../../components/carouselSection";
import { IMovieListLandingPage } from "../../util/interface";
import BackdropSection from "../../components/backdropSection";

export const cardNum = Math.floor(window.innerWidth / 200);

const LandingPage = () => {
  const [movies, setMovies] = useState<IMovieListLandingPage>({
    popular: [],
    action: [],
    adventure: [],
    family: [],
    romance: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const callData = async () => {
    const popularMovie = await getPopularMovieList();
    const actionMovie = await getMovieListByGenre("action");
    const adventureMovie = await getMovieListByGenre("adventure");
    const familyMovie = await getMovieListByGenre("family");
    const romanceMovie = await getMovieListByGenre("romance");

    if (
      popularMovie.data &&
      actionMovie.data &&
      adventureMovie.data &&
      familyMovie.data &&
      romanceMovie.data
    ) {
      setMovies({
        popular: popularMovie.data.results,
        action: actionMovie.data.results,
        adventure: adventureMovie.data.results,
        family: familyMovie.data.results,
        romance: romanceMovie.data.results,
      });
      setIsLoading(false);
    }
  };

  const displayCategory = Object.keys(movies);

  useEffect(() => {
    setIsLoading(true);
    callData();
  }, []);

  //   useEffect(() => {
  //     console.log("movies", movies);
  //   }, [movies]);

  //   useEffect(() => {
  //     console.log("isLoading", isLoading);
  //   }, [isLoading]);

  return (
    <main>
      <BackdropSection movies={movies.popular} isLoading={isLoading} />
      {displayCategory.map((category) => {
        return (
          <CarouselSection
            key={category}
            movies={movies[category as keyof typeof movies]}
            card_per_carousel={cardNum}
            category={category as keyof typeof movies}
            isLoading={isLoading}
          />
        );
      })}
    </main>
  );
};

export default LandingPage;
