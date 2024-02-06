/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  IMultipleResponseList,
  IResponseDetail,
  handleDetailResponse,
  handleListResponse,
} from "../util/handleResponse";
import { IResponseList } from "../util/handleResponse";
import { genreConvertToId } from "../util/movieGenreList";
import { IMovieList } from "../util/interface";

const headerConfig = {
  headers: {
    Authorization:
      `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
};

const getPopularMovieList = async (page: number = 1): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getNowPlayingMovieList = async (): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getMovieListByGenre = async (genre: string, page: number = 1 ): Promise<IResponseList> => {
  const genreId = genreConvertToId(genre);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
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

const getMoviebyTitle = async (title: string, page: number = 1 ): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getSimilarMovieList = async (id: number, page: number = 1 ): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getMovieBySearch = async (searchKey: string, page: number = 1): Promise<IResponseList> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchKey}&include_adult=false&language=en-US&page=${page}`,
      headerConfig
    );
    return handleListResponse.success(result);
  } catch (error: any) {
    return handleListResponse.error(error);
  }
};

const getResultMultiplePages = async (getType: string, page: number,title?: string): Promise<IMultipleResponseList>  => {
  try {
    const totalResult: IMovieList[] = [];
    for(let i = 0; i < page; i++){
      let link = '';
      switch (getType) {
        case "popular":
          link = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i+1}`;
          break;
        case "search":
          link = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${i+1}`;
          break;
        default:
          break;
      }
      const result = await axios.get(link,headerConfig)
      const pageResponse: IMovieList[] = handleListResponse.success(result).data!.results.filter(mov => mov.poster_path)
      totalResult.push(...pageResponse)
    }
    //Filter duplicates from API
    const filteredTotalResult = totalResult.filter((mov,index)=>(totalResult.findIndex(x => x.id === mov.id) === index))
    return {status: 200, data: filteredTotalResult};
  } catch (error: any) {
    return handleListResponse.error(error);
  }

}

export {
  getPopularMovieList,
  getNowPlayingMovieList,
  getMovieListByGenre,
  getMovieDetailFromId,
  getMoviebyTitle,
  getSimilarMovieList,
  getMovieBySearch,
  getResultMultiplePages
};
