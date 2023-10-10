import { Axios, AxiosRequestConfig } from "axios";
import { get, post } from "./ApiClient.service";

export const getAllAirportList = async (request: AxiosRequestConfig) => {
  return get("v1/flight/getAirports", { ...request });
};

export const getSearchFlight = async (request: AxiosRequestConfig) => {
  return get("v1/flight/search-flights", { ...request });
};

export const searchFlights = async (request: AxiosRequestConfig) => {
  return post("v1/flight/search-flights", { ...request?.data }, {})
}


export const bookFlight = async (id: string) => {
  return get(`v1/flight/book/${id}`)
}
