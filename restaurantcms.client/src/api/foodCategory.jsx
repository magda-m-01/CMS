import axios from "axios";

export const getAllFoodCategories = (token) => {
    return axios.get("/api/administrator/FoodCategory/GetAllFoodCategories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addFoodCategory = (token, payload) => {
    return axios.post(
        "/api/administrator/FoodCategory/AddFoodCategory",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const editFoodCategory = (token, payload) => {
    return axios.put(
        "/api/administrator/FoodCategory/EditFoodCategory",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteFoodCategory = (token, id) => {
    console.log("id", id);
    return axios.delete(
        `/api/administrator/FoodCategory/DeleteFoodCategory?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
