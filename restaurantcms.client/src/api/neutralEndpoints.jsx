import axios from "axios";

export const login = (payload) => {
    return axios.post("http://localhost:5000/login", payload);
};

export const register = (payload) => {
    return axios.post("http://localhost:5000/register", payload);
};
