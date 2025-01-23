import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserOptions from "../UserOptions";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
        { name: "About", path: "/about" },
        { name: "Reservations", path: "/reservations" },
    ];

    return (
        location.pathname !== "/login" &&
        location.pathname != "/admin_dashboard" && (
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Typography variant="h6" component="div">
                            MyBrand
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {links.map((link) => (
                            <Button
                                key={link.name}
                                color="inherit"
                                component={Link}
                                to={link.path}
                            >
                                {link.name}
                            </Button>
                        ))}
                    </Box>

                    <UserOptions />
                </Toolbar>
            </AppBar>
        )
    );
};

export default Navbar;
