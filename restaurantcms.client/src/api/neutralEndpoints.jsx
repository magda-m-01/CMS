import axios from "axios";

export const login = (payload) => {
    return axios.post("/api/login", payload);
};

export const register = (payload) => {
    return axios.post("/api/register", payload);
};
