import axios from "axios";
import config from "./config";

const ambiente = config.ambiente;
export const makeRequest = axios.create(
    {
        baseURL: config.baseUrl[ambiente],
        withCredentials: true,
        credentials: 'include',
    },
)
