import axios from "axios";
import { handleResponse } from "../util/handleResponse";
import { IResponse } from "../util/handleResponse";
import { genreConvertToId } from "../util/movieGenreList";


const headerConfig = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGUzZDEwZmUyMzBjZDkwZjE1YzYyNDZmM2U4NDA0OCIsInN1YiI6IjY1OWY4ZmVkMmZkZWM2MDEyYTM2ZWY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PB7tdE9u82OTBFah27Gz1jndcKeWvHT3QqbzDfyI1XM",
    accept: "application/json",
  },
};

const getPopularMovieList = async (): Promise<IResponse> => {
  try {
    const result = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headerConfig
    );
    return handleResponse.success(result);
  } catch (error: any) {
    return handleResponse.error(error);
  }
};

const getMovieListByGenre = async (genre: string): Promise<IResponse> => {
    const genreId = genreConvertToId(genre)
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
        headerConfig
      );
      return handleResponse.success(result);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  };

export { getPopularMovieList, getMovieListByGenre };
