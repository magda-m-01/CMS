import axios from "axios";

export const getAllTables = (token) => {
    return axios.get("http://localhost:5000/administrator/Table/GetAllTables", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllTablesForUser = (token) => {
    return axios.get("http://localhost:5000/authorizeduser/Table/GetAllTablesForUser", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addTable = (token, payload) => {
    return axios.post("http://localhost:5000/administrator/Table/AddTable", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const getAllTableReservations = (token) => {
    return axios.get(
        "http://localhost:5000/authorizeduser/TableReservation/GetAllTableReservations",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAllTableReservationsOfSingleUser = (token) => {
    return axios.get(
        "http://localhost:5000/authorizeduser/TableReservation/GetAllTableReservationsOfSingleUser",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAvailableTablesForDateAndPeople = (token, payload) => {
    return axios.post(
        "http://localhost:5000/authorizeduser/TableReservation/GetAvailableTablesForDateAndPeople",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addTableReservation = (token, payload) => {
    return axios.post(
        "http://localhost:5000/authorizeduser/TableReservation/AddTableReservation",
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
        "http://localhost:5000/authorizeduser/TableReservation/EditTableReservation",
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
        `http://localhost:5000/authorizeduser/TableReservation/DeleteTableReservation?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const editTable = (token, payload) => {
    return axios.put("http://localhost:5000/administrator/Table/EditTable", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const deleteTable = (token, id) => {
    return axios.delete(`http://localhost:5000/administrator/Table/DeleteTable?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const setAllTableReservationsAdmin = (token) => {
    return axios.get(
        "http://localhost:5000/administrator/TableReservation/GetAllTableReservationsAdmin",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteTableReservationAdmin = (token, id) => {
    return axios.delete(
        `http://localhost:5000/administrator/TableReservation/DeleteTableReservationAdmin?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
