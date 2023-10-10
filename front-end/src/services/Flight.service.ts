import { AxiosRequestConfig } from "axios";
import { deleteMethod, get, patch, post } from "./ApiClient.service";


export const getAllFlightsByUser = async (request: AxiosRequestConfig) => {
    return get("v1/flight/byUser",{...request});
}



export const deleteFlightById = async (id:string) => {
    return deleteMethod(`v1/flight/${id}`);
  };

  export const addFlight = async (request : AxiosRequestConfig) => {
    return post("v1/flight", request?.data,{
        headers: {
          processData: false,
          mimeType: "multipart/form-data",
          "content-type": "multipart/form-data",
        },
      });
  }

  export const editFlight = async (request : AxiosRequestConfig) => {
    return patch(`v1/flight/${request.params.flightId}`,{...request?.data});
  }