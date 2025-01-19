import { FormControl, InputLabel, Input, Card } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const LoginForm = ({ setRegister }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loginUser = async () => {
        try {
            const payload = {
                email: "hannatruskawka@gmail.com",
                password: "Haslo.123",
            };
            const response = await axios.post("/api/login", payload);
            console.log("response", response);
            const dishes = await axios.get("/api/Dish/GetDishesPage", {
                headers: {
                    Authorization: `Bearer ${response.data.accessToken}`, // Include the token in the Authorization header
                },
            });
            console.log("dishes", dishes);
            await axios.post(
                "/api/administrator/FoodCategory/AddFoodCategory",
                {
                    name: "danie główne",
                    createdAt: "2025-01-17T12:43:26.914Z",
                },
                {
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("login successfull");
        } catch (err) {
            console.log("login failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUser();
        // setFormData(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 4,
                my: 4,
            }}
        >
            <Typography variant="h5" component="h1">
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
            />
            <Button type="submit" variant="contained" fullWidth>
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
