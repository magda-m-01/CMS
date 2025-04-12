import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Typography, CardMedia, IconButton } from "@mui/material";
import { getHomeWelcomeSectionPage } from "../api/pages";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"; // Material UI icons for arrows

const HomeWelcomeSection = () => {
    const [sections, setSections] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current section
    const [isHovered, setIsHovered] = useState(false); // Tracks hover state for showing arrows
    const token = useSelector((state) => state.auth.token);

    const getHomeWelcomeSection = async () => {
        try {
            const response = await getHomeWelcomeSectionPage(token);
            setSections(response.data || []);
        } catch (error) {
            console.error("Failed to fetch sections", error);
        }
    };

    useEffect(() => {
        getHomeWelcomeSection();
    }, []);

    // Handle previous section click
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sections.length - 1 : prevIndex - 1
        );
    };

    // Handle next section click
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    };

    return (
        sections.length > 0 && (
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: "400px",
                }}
                onMouseEnter={() => setIsHovered(true)} // Show arrows on hover
                onMouseLeave={() => setIsHovered(false)} // Hide arrows when not hovered
            >
                {/* Left arrow */}
                {isHovered && (
                    <IconButton
                        onClick={handlePrevious}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            zIndex: 10,
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                        }}
                    >
                        <ArrowBackIosNew />
                    </IconButton>
                )}

                {/* Right arrow */}
                {isHovered && (
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            zIndex: 10,
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                )}

                {/* Slider content */}
                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 1s ease-in-out",
                        transform: `translateX(-${currentIndex * 100}%)`,
                        height: "100%",
                    }}
                >
                    {sections.map((section) => (
                        <Box
                            key={section.id}
                            sx={{
                                minWidth: "100%",
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={section.photoUrl}
                                alt="Section Image"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.7)",
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
                                    color: "white",
                                    textAlign: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <Typography variant="h4">
                                    {section.content}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        )
    );
};

export default HomeWelcomeSection;
