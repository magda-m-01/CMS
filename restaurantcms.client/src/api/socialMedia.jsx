import axios from "axios";

export const getAllSocialMedia = (token) => {
    return axios.get("http://localhost:5000/administrator/SocialMedia/GetAllSocialMedia", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addSocialMedia = (token, payload) => {
    return axios.post(
        "http://localhost:5000/administrator/SocialMedia/AddSocialMedia",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editSocialMedia = (token, payload) => {
    return axios.put(
        "http://localhost:5000/administrator/SocialMedia/EditSocialMedia",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteSocialMedia = (token, id) => {
    return axios.delete(
        `http://localhost:5000/administrator/SocialMedia/DeleteSocialMedia?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
