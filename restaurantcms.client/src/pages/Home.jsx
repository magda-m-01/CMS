import { Box, Typography, CardMedia } from "@mui/material";
import HomeWelcomeSection from "../components/HomeWelcomeSection";
import HomeGallery from "../components/HomeGallery";

const Home = () => {
    return (
        <Box>
            <HomeWelcomeSection />
            <HomeGallery />
        </Box>
    );
};

export default Home;
