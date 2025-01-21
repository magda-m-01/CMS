import { useSelector } from "react-redux";
import { getHomeWelcomeSectionPage } from "../api/pages";
import { useState, useEffect } from "react";
import { Box, Typography, CardMedia } from "@mui/material";

const Home = () => {
    const [sections, setSections] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getHomeWelcomeSection = async () => {
        const response = await getHomeWelcomeSectionPage(token);
        console.log("response", response.data);
        setSections(response.data);
    };

    useEffect(() => {
        getHomeWelcomeSection();
    }, []);

    useEffect(() => {
        console.log("sections", sections);
    }, [sections]);

    return (
        sections.length > 0 && (
            <Box>
                {sections.map((section, key) => (
                    <Box
                        key={section.id}
                        sx={{ marginBottom: 2, position: "relative" }}
                    >
                        <CardMedia
                            component="img"
                            image={
                                "https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_1280.jpg"
                            }
                            alt="Section Image"
                            sx={{
                                objectFit: "contain",
                                backgroundColor: "#f0f0f0",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                textAlign: "center",
                                boxSizing: "border-box",
                            }}
                        >
                            <Typography sx={{ fontSize: "40px" }}>
                                {section.content || "No content available."}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        )
    );
};

export default Home;
