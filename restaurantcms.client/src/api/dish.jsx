import axios from "axios";

export const getAllDishes = (token) => {
    return axios.get("/api/administrator/Dish/GetAllDishes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addDish = (token, payload) => {
    return axios.post("/api/administrator/Dish/AddDish", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const editDish = (token, payload) => {
    return axios.put("/api/administrator/Dish/EditDish", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const deleteDish = (token, id) => {
    console.log("id", id);
    return axios.delete(`/api/administrator/Dish/DeleteDish?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
