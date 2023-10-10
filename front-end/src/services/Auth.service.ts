import { AxiosRequestConfig } from "axios";
import { post } from "./ApiClient.service";


export const signUp = async (request: AxiosRequestConfig) => {
    return post("v1/auth/register", { ...request?.data }, {});
}

export const login = async (request: AxiosRequestConfig) => {
    return post("v1/auth/login", { ...request?.data }, {});
};