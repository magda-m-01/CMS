import axios from "axios";

export const getAllTables = (token) => {
    return axios.get("http://localhost:5000/administrator/Table/GetAllTables", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
