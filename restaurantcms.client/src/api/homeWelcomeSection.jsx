import axios from "axios";

export const getHomeWelcomeSections = (token) => {
    return axios.get(
        "http://localhost:5000/administrator/HomeWelcomeSection/GetHomeWelcomeSections",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addHomeWelcomeSection = (token, payload) => {
    return axios.post(
        "http://localhost:5000/administrator/HomeWelcomeSection/AddHomeWelcomeSection",
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
        "http://localhost:5000/administrator/HomeWelcomeSection/EditHomeWelcomeSection",
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
        `http://localhost:5000/administrator/HomeWelcomeSection/DeleteHomeWelcomeSection?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
