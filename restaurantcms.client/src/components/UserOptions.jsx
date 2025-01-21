import { Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

const UserOptions = () => {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(setToken(null));
    };

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ color: "#fff" }} />
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
