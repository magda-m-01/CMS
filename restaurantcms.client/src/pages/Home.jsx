import { Box, Typography, CardMedia } from "@mui/material";
import HomeWelcomeSection from "../components/HomeWelcomeSection";
import HomeGallery from "../components/HomeGallery";
import DishesOfTheDay from "../components/DishesOfTheDay";

const Home = () => {
    return (
        <Box>
            <HomeWelcomeSection />
            <DishesOfTheDay />
            <HomeGallery />
        </Box>
    );
};

export default Home;
