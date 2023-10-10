import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosClient } from "../config/api.config";

/**
 * Gets the headers.
 *
 */
const getHeaders = (data: any, isDeleteMethod?: boolean) => {
  let axiosConfig: any = {
    headers: {},
  };
  const userToken = localStorage.getItem("token");
  axiosConfig.headers["accept-language"] = "en";
  axiosConfig.headers["Content-Type"] = "application/json";
  axiosConfig.headers["ngrok-skip-browser-warning"] = "69420";

  if (data) {

    if (data.headers) {
      for (var key in data.headers) {
        if (data.headers.hasOwnProperty(key)) {
          axiosConfig.headers[key] = data.headers[key];
        }
      }
    }
    if (data.params) {
      axiosConfig.params = { ...data.params };
    }
    if (data.data && isDeleteMethod) {
      axiosConfig.data = { ...data.data };
    }
  }
  if (userToken) {
    axiosConfig.headers["authorization"] = `Bearer ${userToken}`;
  } else {
    axiosConfig.headers["authorization"] = ``;
  }

  return axiosConfig;
};

export const get = async (
  path: string,
  config?: AxiosRequestConfig,
) => {
  return await axiosClient
    .get(`${path}`, getHeaders(config))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const post = async (
  path: string,
  payload: any,
  config?: AxiosRequestConfig,
) => {
  return await axiosClient
    .post(`${path}`, payload, getHeaders(config))
    .then((response: any) => {
      if (response?.data?.data?.token) {
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem(
          "refreshToken",
          response?.data?.data?.refreshToken
        );
        localStorage.setItem("userDetails", JSON.stringify(response?.data?.data?.user));
      }
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const put = async (
  path: string,
  payload: any,
  config?: AxiosRequestConfig,
) => {
  return await axiosClient
    .put(`${path}`, payload, getHeaders(config))
    .then((response: any) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const patch = async (
  path: string,
  payload: any,
  config?: AxiosRequestConfig,
) => {
  return await axiosClient
    .patch(`${path}`, payload, getHeaders(config))
    .then((response: any) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const deleteMethod = async (
  path: string,
  config?: AxiosRequestConfig,
) => {
  return await axiosClient
    .delete(`${path}`, getHeaders(config, true))
    .then((response: any) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
