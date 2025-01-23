import axios from "axios";

export const getAllRestaurantStaff = (token) => {
    return axios.get(
        "/api/administrator/RestaurantStaff/GetAllRestaurantStaff",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addRestaurantStaff = (token, payload) => {
    return axios.post(
        "/api/administrator/RestaurantStaff/AddRestaurantStaff",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editRestaurantStaff = (token, payload) => {
    return axios.put(
        "/api/administrator/RestaurantStaff/EditRestaurantStaff",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteRestaurantStaff = (token, id) => {
    return axios.delete(
        `/api/administrator/RestaurantStaff/DeleteRestaurantStaff?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
