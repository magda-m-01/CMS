import axios from "axios";

export const getHomeWelcomeSections = (token) => {
    return axios.get(
        "/api/administrator/HomeWelcomeSection/GetHomeWelcomeSections",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addHomeWelcomeSection = (token, payload) => {
    return axios.post(
        "/api/administrator/HomeWelcomeSection/AddHomeWelcomeSection",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editHomeWelcomeSection = (token, payload) => {
    return axios.put(
        "/api/administrator/HomeWelcomeSection/EditHomeWelcomeSection",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteHomeWelcomeSection = (token, id) => {
    console.log("id", id);
    return axios.delete(
        `/api/administrator/HomeWelcomeSection/DeleteHomeWelcomeSection?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
