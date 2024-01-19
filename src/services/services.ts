import axios from "axios";
import {
  IResponseDetail,
  handleDetailResponse,
  handleListResponse,
} from "../util/handleResponse";
import { IResponseList } from "../util/handleResponse";
import { genreConvertToId } from "../util/movieGenreList";

const headerConfig = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGUzZDEwZmUyMzBjZDkwZjE1YzYyNDZmM2U4NDA0OCIsInN1YiI6IjY1OWY4ZmVkMmZkZWM2MDEyYTM2ZWY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PB7tdE9u82OTBFah27Gz1jndcKeWvHT3QqbzDfyI1XM",
    accept: "application/json",
  },
};

const getPopularMovieList = async (): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getMovieListByGenre = async (genre: string): Promise<IResponseList> => {
  const genreId = genreConvertToId(genre);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getMovieDetailFromId = async (id: number): Promise<IResponseDetail> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      headerConfig
    );
    return handleDetailResponse.success(result);
  } catch (error: any) {
    return handleDetailResponse.error(error);
  }
};

const getMoviebyTitle = async (title: string): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getSimilarMovieList = async (id: number): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

export { getPopularMovieList, getMovieListByGenre, getMovieDetailFromId, getMoviebyTitle, getSimilarMovieList };
