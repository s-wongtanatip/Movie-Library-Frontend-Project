import { AxiosError, AxiosResponse } from "axios";
import { IMovieDetail, IMovieList } from "../services/interface";

export interface IResponseList {
  status: number | undefined;
  data?: {
    page: number;
    results: IMovieList[];
    total_pages: number;
    total_results: number;
  };
  err?: AxiosResponse<any, any> | undefined;
}

const handleListResponse = {
  success: (res: AxiosResponse): IResponseList => {
    return {
      status: res.status,
      data: res.data,
    };
  },
  error: (res: AxiosError<AxiosResponse>) => {
    return {
      status: res.response?.status,
      err: res.response?.data,
    };
  },
};

export interface IResponseDetail {
  status: number | undefined;
  data?: IMovieDetail,
  err?: AxiosResponse<any, any> | undefined;
}

const handleDetailResponse = {
  success: (res: AxiosResponse): IResponseDetail => {
    return {
      status: res.status,
      data: res.data,
    };
  },
  error: (res: AxiosError<AxiosResponse>) => {
    return {
      status: res.response?.status,
      err: res.response?.data,
    };
  },
};

export { handleListResponse, handleDetailResponse };
