import { Box, Typography, CardMedia } from "@mui/material";
import HomeWelcomeSection from "../components/HomeWelcomeSection";
import HomeGallery from "../components/HomeGallery";
import DishesOfTheDay from "../components/DishesOfTheDay";
import RestaurantStaff from "../components/RestaurantStaff";

const Home = () => {
    return (
        <Box>
            <HomeWelcomeSection />
            <DishesOfTheDay />
            <HomeGallery />
            <RestaurantStaff />
        </Box>
    );
};

export default Home;
