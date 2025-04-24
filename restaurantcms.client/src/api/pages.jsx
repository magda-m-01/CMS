import axios from "axios";

export const getDishesPage = () => {
    return axios.get("http://localhost:5000/Dish/GetDishesPage");
};

export const getHomeWelcomeSectionPage = () => {
    return axios.get("http://localhost:5000/HomeWelcomeSection/GetHomeWelcomeSectionsPage");
};

export const getHomeGalleriesPage = (token) => {
    return axios.get("http://localhost:5000/HomeGallery/GetHomeGalleriesPage");
};

export const getRestaurantDetailsPage = (token) => {
    return axios.get("http://localhost:5000/RestaurantDetails/GetRestaurantDetailsPage");
};

export const getRestaurantStaffPage = (token) => {
    return axios.get("http://localhost:5000/RestaurantStaff/GetRestaurantStaffPage");
};

export const getSocialMedia = (token) => {
    return axios.get("http://localhost:5000/SocialMedia/GetSocialMedia");
};
