import axios from "axios";

export const getDishesPage = () => {
    return axios.get("/api/Dish/GetDishesPage");
};

export const getHomeWelcomeSectionPage = () => {
    return axios.get("/api/HomeWelcomeSection/GetHomeWelcomeSectionsPage");
};
