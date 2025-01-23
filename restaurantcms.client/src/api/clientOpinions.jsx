import axios from "axios";

export const getAllClientsOpinions = (token) => {
    return axios.get(
        "/api/authorizeduser/ClientOpinions/GetAllClientsOpinions",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addClientOpinion = (token, payload) => {
    return axios.post(
        "/api/authorizeduser/ClientOpinions/AddClientOpinion",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editClientOpinion = (token, payload) => {
    return axios.put(
        "/api/authorizeduser/ClientOpinions/EditClientOpinion",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteClientOpinion = (token, id) => {
    console.log("id", id);
    return axios.delete(
        `/api/authorizeduser/ClientOpinions/DeleteClientOpinion?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
