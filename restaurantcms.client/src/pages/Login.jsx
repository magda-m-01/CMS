import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { Box, Card, Typography } from "@mui/material";
import { Card as JoyCard } from "@mui/joy";

const Login = () => {
    const [register, setRegister] = useState(false);
    const [justRegistered, setJustRegistered] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                flexDirection: "column",
                gap: 1,
            }}
        >
            {justRegistered && (
                <JoyCard color="success" sx={{ width: 500 }}>
                    You registered successfully. Login to use the website
                </JoyCard>
            )}
            <Card sx={{ width: 500, p: 4 }}>
                {register ? (
                    <RegisterForm
                        setJustRegistered={setJustRegistered}
                        setRegister={setRegister}
                    />
                ) : (
                    <Box>
                        <LoginForm setRegister={setRegister} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                            }}
                        >
                            <Typography>{`Don't have an account?`}</Typography>
                            <Typography
                                onClick={() => setRegister(true)}
                                sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                }}
                            >
                                Register
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default Login;
