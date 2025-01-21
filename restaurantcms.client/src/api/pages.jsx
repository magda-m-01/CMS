import axios from "axios";

export const getDishesPage = () => {
    return axios.get("/api/Dish/GetDishesPage");
};

export const getHomeWelcomeSectionPage = () => {
    return axios.get("/api/HomeWelcomeSection/GetHomeWelcomeSectionsPage");
};

export const getHomeGalleriesPage = (token) => {
    return axios.get("/api/HomeGallery/GetHomeGalleriesPage");
};

export const getRestaurantDetailsPage = (token) => {
    return axios.get("/api/RestaurantDetails/GetRestaurantDetailsPage");
};

export const getRestaurantStaffPage = (token) => {
    return axios.get("/api/RestaurantDetails/GetRestaurantStaffPage");
};
