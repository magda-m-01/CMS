import axios from "axios";

export const getRestaurantDetails = (token) => {
    return axios.get(
        "http://localhost:5000/administrator/RestaurantDetails/GetRestaurantDetails",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addRestaurantDetails = (token, payload) => {
    return axios.post(
        "http://localhost:5000/administrator/RestaurantDetails/AddRestaurantDetails",
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
        "http://localhost:5000/administrator/RestaurantDetails/EditRestaurantDetails",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteRestaurantDetails = (token, id) => {
    console.log("id", id);
    return axios.delete(
        `http://localhost:5000/administrator/RestaurantDetails/DeleteRestaurantDetails?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
