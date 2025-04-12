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
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const location = useLocation();

    const links = [
        { name: "Home", path: "/", loggedIn: false },
        { name: "Menu", path: "/menu", loggedIn: false },
        { name: "About", path: "/about", loggedIn: false },
        { name: "Reservations", path: "/reservations", loggedIn: true },
    ];

    return (
        location.pathname !== "/login" &&
        location.pathname != "/admin_dashboard" && (
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#333",
                        background: "#fff",
                    }}
                >
                    <Box sx={{ width: "100%", pl: "58px" }}>
                        {links.map(
                            (link) =>
                                ((link.loggedIn && isLoggedIn) ||
                                    !link.loggedIn) && (
                                    <Button
                                        key={link.name}
                                        color="inherit"
                                        component={Link}
                                        to={link.path}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            {link.name}
                                        </Typography>
                                    </Button>
                                )
                        )}
                    </Box>

                    <UserOptions />
                </Toolbar>
            </AppBar>
        )
    );
};

export default Navbar;
