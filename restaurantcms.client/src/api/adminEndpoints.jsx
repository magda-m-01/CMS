import axios from "axios";

export const getAllTables = (token) => {
    return axios.get("/api/administrator/Table/GetAllTables", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
