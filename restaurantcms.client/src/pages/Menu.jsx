import { Box, Typography } from "@mui/material";
import { getDishesPage } from "../api/pages";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getDishes = async () => {
        const response = await getDishesPage(token);
        setDishes(response.data);
    };

    useEffect(() => {
        getDishes();
    }, []);

    return (
        <Box>
            {dishes.map((dish, key) => (
                <Box key={key}>
                    <Typography>{dish.name}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default Menu;
