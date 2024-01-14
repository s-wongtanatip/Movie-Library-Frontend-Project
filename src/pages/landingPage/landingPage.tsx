import { useEffect, useState } from "react";
import {
  getMovieListByGenre,
  getPopularMovieList,
} from "../../services/services";
import { IMovieList } from "../../services/interface";
import CarouselSection from "../../components/carouselSection";

export interface IMovieListLandingPage {
  popular: IMovieList[];
  action: IMovieList[];
  adventure: IMovieList[];
  family: IMovieList[];
  romance: IMovieList[];
}

export const cardNum = Math.floor(window.innerWidth / 200);

const LandingPage = () => {
  const [movies, setMovies] = useState<IMovieListLandingPage>({
    popular: [],
    action: [],
    adventure: [],
    family: [],
    romance: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      <CarouselSection
        movies={movies.popular}
        card_per_carousel={cardNum}
        category="popular"
        isLoading={isLoading}
      />
      <CarouselSection
        movies={movies.action}
        card_per_carousel={cardNum}
        category="action"
        isLoading={isLoading}
      />
      <CarouselSection
        movies={movies.adventure}
        card_per_carousel={cardNum}
        category="adventure"
        isLoading={isLoading}
      />
      <CarouselSection
        movies={movies.family}
        card_per_carousel={cardNum}
        category="family"
        isLoading={isLoading}
      />
      <CarouselSection
        movies={movies.romance}
        card_per_carousel={cardNum}
        category="romance"
        isLoading={isLoading}
      />
    </main>
  );
};

export default LandingPage;
