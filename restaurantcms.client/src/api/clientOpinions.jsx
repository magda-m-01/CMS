import axios from "axios";

export const getAllClientsOpinions = (token) => {
    return axios.get("http://localhost:5000/ClientOpinions/GetAllClientOpinions", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addClientOpinion = (token, payload) => {
    return axios.post(
        "http://localhost:5000/authorizeduser/ClientOpinions/AddClientOpinion",
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
        "http://localhost:5000/authorizeduser/ClientOpinions/EditClientOpinion",
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
        `http://localhost:5000/authorizeduser/ClientOpinions/DeleteClientOpinion?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAllClientOpinionsAdmin = (token) => {
    return axios.get(
        "http://localhost:5000/administrator/ClientOpinions/GetAllClientOpinionsAdmin",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteClientOpinionAdmin = (token, id) => {
    console.log("id", id);
    return axios.delete(
        `http://localhost:5000/administrator/ClientOpinions/DeleteClientOpinionAdmin?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
