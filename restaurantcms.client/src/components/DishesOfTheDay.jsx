import React from "react";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDishesPage } from "../api/pages";

const DishesOfTheDay = () => {
    const [dishesOfTheDay, setDishesOfTheDay] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getDishes = async () => {
        const response = await getDishesPage(token);
        const filteredDishes = response.data
            .flatMap((category) => category.listOfDishes)
            .filter((dish) => dish.isDishOfDay);

        setDishesOfTheDay(filteredDishes);
    };

    useEffect(() => {
        getDishes();
    }, []);

    return (
        <Box sx={{ padding: "20px" }}>
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
                    <Grid item xs={12} sm={6} md={3} key={dish.id}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                borderRadius: "15px",
                                overflow: "hidden",
                                position: "relative",
                                border: "3px solid rgba(255, 165, 0, 0.8)",
                            }}
                        >
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
                                        backgroundColor: "rgba(255, 165, 0, 1)",
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>

                            <CardContent>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <RestaurantIcon
                                        sx={{
                                            fontSize: 50,
                                            color: "rgba(255, 165, 0, 1)",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {dish.name}
                                    </Typography>
                                    {dish.category && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            {dish.category.name}
                                        </Typography>
                                    )}
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    ${dish.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DishesOfTheDay;
