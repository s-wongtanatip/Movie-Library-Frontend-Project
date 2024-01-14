import { createContext, useEffect, useState } from "react";
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

export const isLoadingContext = createContext(false);

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
    //   setIsLoading(false);
    }
  };

  useEffect(() => {
    // setIsLoading(true);
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
      <isLoadingContext.Provider value={isLoading}>
        <header>
          <NavBar />
        </header>
        <main>
          <CarouselSection
            movies={movies.popular}
            cardNumber={9}
            category="popular"
          />
          <CarouselSection
            movies={movies.action}
            cardNumber={9}
            category="action"
          />
          <CarouselSection
            movies={movies.adventure}
            cardNumber={9}
            category="adventure"
          />
        </main>
      </isLoadingContext.Provider>
    </>
  );
};

export default LandingPage;
