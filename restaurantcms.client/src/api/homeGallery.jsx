import axios from "axios";

export const getAllHomeGalleries = (token) => {
    return axios.get("http://localhost:5000/administrator/HomeGallery/getAllHomeGalleries", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addHomeGallery = (token, payload) => {
    return axios.post(
        "http://localhost:5000/administrator/HomeGallery/AddHomeGallery",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteHomeGallery = (token, id) => {
    return axios.delete(
        `http://localhost:5000/administrator/HomeGallery/DeleteHomeGallery?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};
