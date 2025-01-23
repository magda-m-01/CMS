import axios from "axios";

export const getAllSocialMedia = (token) => {
    return axios.get("/api/administrator/SocialMedia/GetAllSocialMedia", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addSocialMedia = (token, payload) => {
    return axios.post(
        "/api/administrator/SocialMedia/AddSocialMedia",
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
        "/api/administrator/SocialMedia/EditSocialMedia",
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
        `/api/administrator/SocialMedia/DeleteSocialMedia?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
