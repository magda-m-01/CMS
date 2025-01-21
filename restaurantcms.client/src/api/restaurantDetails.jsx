import axios from "axios";

export const getRestaurantDetails = (token) => {
    return axios.get(
        "/api/administrator/RestaurantDetails/GetRestaurantDetails",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addRestaurantDetails = (token, payload) => {
    return axios.post(
        "/api/administrator/RestaurantDetails/AddRestaurantDetails",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editRestaurantDetails = (token, payload) => {
    return axios.put(
        "/api/administrator/RestaurantDetails/EditRestaurantDetails",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};
