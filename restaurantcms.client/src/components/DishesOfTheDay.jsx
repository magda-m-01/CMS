import React from "react";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDishesPage } from "../api/pages";

const DishesOfTheDay = ({ dishes }) => {
    const [dishesOfTheDay, setDishesOfTheDay] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getDishes = async () => {
        const response = await getDishesPage(token);
        const filteredDishes = response.data.filter((dish) => dish.isDishOfDay);
        setDishesOfTheDay(filteredDishes);
    };

    useEffect(() => {
        getDishes();
    }, []);

    return (
        <Box
            sx={{
                padding: "20px",
            }}
        >
            <Typography
                sx={{
                    color: "#111",
                    marginBottom: "30px",
                    width: "100%",
                    textAlign: "left",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "20px",
                }}
            >
                Dishes of the Day
            </Typography>
            <Grid container spacing={4}>
                {dishesOfTheDay.map((dish) => (
                    <Grid item xs={12} sm={6} md={4} key={dish.id}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                borderRadius: "15px",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            {/* Gradient overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "80px",
                                    background:
                                        "linear-gradient(to bottom, rgba(255, 165, 0, 0.8), transparent)",
                                    zIndex: 1,
                                }}
                            ></Box>

                            {/* Star icon badge */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: 2,
                                }}
                            >
                                <Chip
                                    icon={<StarIcon />}
                                    label="Dish of the Day"
                                    color="primary"
                                    variant="filled"
                                    sx={{
                                        backgroundColor: "#ffa726",
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>

                            <CardContent>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <RestaurantIcon
                                        sx={{
                                            fontSize: 50,
                                            color: "#ff7043",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {dish.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        {dish.category.name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        ${dish.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DishesOfTheDay;
