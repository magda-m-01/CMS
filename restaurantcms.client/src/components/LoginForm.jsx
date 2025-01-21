import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { login } from "../api/neutralEndpoints";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import { setIsAdmin } from "../slices/authSlice";
import { getAllTables } from "../api/adminEndpoints";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loginUser = async () => {
        try {
            const response = await login(formData);
            await dispatch(setToken(response.data.accessToken));

            try {
                await getAllTables(response.data.accessToken); // Assuming this returns successfully if user is admin
                await dispatch(setIsAdmin(true));
            } catch (err) {
                await dispatch(setIsAdmin(false));
            }

            navigate("/");
        } catch (err) {
            console.log("login failed", err);
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
                mb: 4,
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
