/* eslint-disable no-mixed-spaces-and-tabs */
import axios, { AxiosResponse, AxiosPromise, Method } from "axios";
import { _url } from "./service-tools";

export type ResponseResult<Result> = Promise<AxiosResponse<Result>>;
type HttpServiceMock = <D>(mockData: D) => ResponseResult<D>;

/**
 * Функция обращения к серверу
 * @param method - HTTP метод запроса
 * @param action - часть URL для API вызова
 * @param query - опциональный запрос
 * @param data - данные для тела запроса
 * @param config - дополнительная конфигурация для запроса
 * @returns - ответ сервера
 */
const httpService = async <T>(
  method: Method,
  action: string,
  query?: string,
  data?: any,
  headers?: any
) => {
  try {
    const response: AxiosResponse<T> = await axios({
      method: method,
      url: _url(action, query),
      data: data instanceof FormData ? data : JSON.stringify(data),
      headers: headers,
    });
    return {
      data: response.data as T,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };
  } catch (e) {
    throw new Error("Bad Request! " + e);
  }
};

const httpServiceMock: HttpServiceMock = (mockData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: mockData,
        status: 200,
        statusText: "success",
        headers: [] as any,
        config: {} as any,
      });
    }, 1500);
  });
};

export { httpService, httpServiceMock };
