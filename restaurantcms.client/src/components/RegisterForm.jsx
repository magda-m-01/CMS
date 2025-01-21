import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { register } from "../api/neutralEndpoints";
import Card from "@mui/joy/Card";

const RegisterForm = ({ setRegister, setJustRegistered }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const registerUser = async () => {
        try {
            const response = await register(formData);
            console.log("response", response);
            setRegister(false);
            setJustRegistered(true);
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerUser();
    };

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                my: 4,
            }}
        >
            {errors &&
                Object.entries(errors).map(([key, messages]) => (
                    <Card
                        key={key}
                        color="danger"
                        variant="soft"
                        sx={{ px: 1, py: 0.5, width: "100%" }}
                    >
                        {messages.map((message, index) => (
                            <Typography key={index} sx={{ fontSize: "12px" }}>
                                {message}
                            </Typography>
                        ))}
                    </Card>
                ))}
            <Typography variant="h5" component="h1">
                Register
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
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
