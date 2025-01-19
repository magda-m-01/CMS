import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { Box, Card } from "@mui/material";

const Login = () => {
    const [register, setRegister] = useState(false);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Card sx={{ width: 500 }}>
                {register ? (
                    <RegisterForm />
                ) : (
                    <LoginForm setRegister={setRegister} />
                )}
            </Card>
        </Box>
    );
};

export default Login;
