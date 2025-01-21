import axios from "axios";

export const getAllHomeGalleries = (token) => {
    return axios.get("/api/administrator/HomeGallery/getAllHomeGalleries", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addHomeGallery = (token, payload) => {
    return axios.post(
        "/api/administrator/HomeGallery/AddHomeGallery",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteHomeGallery = (token, payload) => {
    return axios.put(
        "/api/administrator/HomeGallery/DeleteHomeGallery",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};
