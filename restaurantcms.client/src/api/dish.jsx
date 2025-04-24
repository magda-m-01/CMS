import axios from "axios";

export const getAllDishes = (token) => {
    return axios.get("http://localhost:5000/administrator/Dish/GetAllDishes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addDish = (token, payload) => {
    return axios.post("http://localhost:5000/administrator/Dish/AddDish", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const editDish = (token, payload) => {
    return axios.put("http://localhost:5000/administrator/Dish/EditDish", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const deleteDish = (token, id) => {
    console.log("id", id);
    return axios.delete(`http://localhost:5000/administrator/Dish/DeleteDish?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
