import axios from "axios";

export const makeRequest = axios.create(
    {
        baseURL: "http://localhost:3250/api",
        withCredentials: true,
    },
)

export const makeJWTRequest = (access_token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", access_token);
    axios.create({
        baseURL: "http://localhost:3250/api",
        withCredentials: true,
        headers: myHeaders
    })
}
