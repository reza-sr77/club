import axios from "axios";
import { BaseUrl } from "./config";

const Axios = axios.create({ baseURL: BaseUrl });

export function getJwt() {
    let jwt = localStorage.getItem("jwtToken");
    return jwt;
}


Axios.interceptors.request.use(
    (AxiosConfig) => {
        const newConfig = { ...AxiosConfig };
        newConfig.headers.Authorization = `${getJwt()}`;
        newConfig.headers["Content-Type"] = "application/json";
        return newConfig;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default {
    GET: Axios.get,
    POST: Axios.post,
    PUT: Axios.put,
    PATCH: Axios.patch,
    DELETE: Axios.delete
};
