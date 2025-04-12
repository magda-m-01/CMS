import { Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import { useNavigate } from "react-router";

const UserOptions = () => {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(setToken(null));
        navigate("/");
    };

    return (
        <Box>
            <IconButton
                onClick={handleClick}
                sx={{ p: 0, px: 2, height: "64px" }}
            >
                <AccountCircleIcon sx={{ color: "#333", fontSize: "26px" }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {isAdmin && (
                    <MenuItem>
                        <Link
                            href="/admin_dashboard"
                            sx={{ textDecoration: "none", color: "inherit" }}
                        >
                            Admin Dashboard
                        </Link>
                    </MenuItem>
                )}
                {isLoggedIn ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    <MenuItem>
                        <Link
                            href="/login"
                            sx={{ textDecoration: "none", color: "inherit" }}
                        >
                            Login
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};

export default UserOptions;
