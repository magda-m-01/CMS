import axios from "axios";

export const getAllTables = (token) => {
    return axios.get("/api/administrator/Table/GetAllTables", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addTable = (token, payload) => {
    return axios.post("/api/administrator/Table/AddTable", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const getAllTableReservations = (token) => {
    return axios.get(
        "/api/authorizeduser/TableReservation/GetAllTableReservations",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addTableReservation = (token, payload) => {
    return axios.post(
        "/api/authorizeduser/TableReservation/AddTableReservation",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};
