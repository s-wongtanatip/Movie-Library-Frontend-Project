import { AxiosError, AxiosResponse } from "axios";
import { IMovieList } from "../services/interface";

export interface IResponse {
  status: number | undefined;
  data?: {
    page: number;
    results: IMovieList[];
    total_pages: number;
    total_results: number;
  };
  err?: AxiosResponse<any, any> | undefined;
}

const handleResponse = {
  success: (res: AxiosResponse): IResponse => {
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

export { handleResponse };
