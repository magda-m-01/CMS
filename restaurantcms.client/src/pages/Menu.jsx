import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
} from "@mui/material";
import { RestaurantMenu, Fastfood, Cake, LocalBar } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getDishesPage } from "../api/pages";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getDishes = async () => {
        const response = await getDishesPage(token);
        const filteredDishes = response.data.map((category) => ({
            categoryName: category.categroy.name,
            categoryId: category.categroy.id,
            dishes: category.listOfDishes,
        }));
        setMenu(filteredDishes);
    };

    useEffect(() => {
        getDishes();
    }, []);

    const categoryIcons = {
        zupa: <RestaurantMenu />,
        danie_glowne: <Fastfood />,
        deser: <Cake />,
        napoje: <LocalBar />,
    };

    return (
        <Box sx={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    color: "#333",
                    marginBottom: "40px",
                }}
            >
                Our Menu
            </Typography>
            <Grid container spacing={6}>
                {menu.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
                        <Card
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                overflow: "hidden",
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            {/* Category Icon */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#ff7043",
                                    padding: "20px",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 2,
                                }}
                            >
                                <IconButton
                                    sx={{
                                        backgroundColor: "#fff",
                                        padding: "10px",
                                        borderRadius: "50%",
                                    }}
                                >
                                    {categoryIcons[
                                        category.categoryName.toLowerCase()
                                    ] || <RestaurantMenu />}
                                </IconButton>
                            </Box>

                            <CardContent sx={{ paddingTop: "80px" }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: "600",
                                        color: "#333",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                    }}
                                >
                                    {category.categoryName}
                                </Typography>

                                {/* Dishes List */}
                                {category.dishes.map((dish) => (
                                    <Box
                                        key={dish.id}
                                        sx={{ marginBottom: "20px" }}
                                    >
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={8}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: "500" }}
                                                >
                                                    {dish.name}
                                                </Typography>
                                                {dish.ingredients &&
                                                    dish.ingredients.length >
                                                        0 && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: "text.secondary",
                                                                fontStyle:
                                                                    "italic",
                                                                marginTop:
                                                                    "8px",
                                                            }}
                                                        >
                                                            Ingredients:{" "}
                                                            {dish.ingredients
                                                                .split(",")
                                                                .map(
                                                                    (
                                                                        ingredient,
                                                                        index
                                                                    ) => (
                                                                        <Chip
                                                                            key={
                                                                                index
                                                                            }
                                                                            label={ingredient.trim()}
                                                                            sx={{
                                                                                margin: "4px",
                                                                                fontSize:
                                                                                    "12px",
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                        </Typography>
                                                    )}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        textAlign: "right",
                                                        color: "#ff7043",
                                                    }}
                                                >
                                                    ${dish.price.toFixed(2)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Menu;
