import { useEffect, useState } from "react";
import {
  getMovieListByGenre,
  getPopularMovieList,
} from "../../services/services";
import { IMovieList } from "../../services/interface";
import NavBar from "../../components/navBar";
import CarouselSection from "../../components/LandingPage/carouselSection";

export interface IMovieListLandingPage {
  popular: IMovieList[];
  action: IMovieList[];
  adventure: IMovieList[];
}

const LandingPage = () => {
  const [movies, setMovies] = useState<IMovieListLandingPage>({
    popular: [],
    action: [],
    adventure: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const callData = async () => {
    const popularMovie = await getPopularMovieList();
    const actionMovie = await getMovieListByGenre("action");
    const adventureMovie = await getMovieListByGenre("adventure");

    if (popularMovie.data && actionMovie.data && adventureMovie.data) {
      setMovies({
        popular: popularMovie.data.results,
        action: actionMovie.data.results,
        adventure: adventureMovie.data.results,
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

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  return (
    <>
        <header>
          <NavBar />
        </header>
        <main>
          <CarouselSection
            movies={movies.popular}
            card_per_carousel={9}
            category="popular"
            isLoading={isLoading}
          />
          <CarouselSection
            movies={movies.action}
            card_per_carousel={9}
            category="action"
            isLoading={isLoading}
          />
          <CarouselSection
            movies={movies.adventure}
            card_per_carousel={9}
            category="adventure"
            isLoading={isLoading}
          />
        </main>
    </>
  );
};

export default LandingPage;
