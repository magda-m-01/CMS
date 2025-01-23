import axios from "axios";

export const getAllTables = (token) => {
    return axios.get("/api/administrator/Table/GetAllTables", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllTablesForUser = (token) => {
    return axios.get("/api/authorizeduser/Table/GetAllTablesForUser", {
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

export const getAllTableReservationsOfSingleUser = (token) => {
    return axios.get(
        "/api/authorizeduser/TableReservation/GetAllTableReservationsOfSingleUser",
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

export const editTableReservation = (token, payload) => {
    return axios.put(
        "/api/authorizeduser/TableReservation/EditTableReservation",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteTableReservation = (token, id) => {
    return axios.delete(
        `/api/authorizeduser/TableReservation/DeleteTableReservation?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const editTable = (token, payload) => {
    return axios.put("/api/administrator/Table/EditTable", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const deleteTable = (token, id) => {
    return axios.delete(`/api/administrator/Table/DeleteTable?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
