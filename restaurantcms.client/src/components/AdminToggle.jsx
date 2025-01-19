import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin } from "../slices/authSlice";
import { Switch, FormGroup, FormControlLabel, Box } from "@mui/material";

const AdminToggle = () => {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const dispatch = useDispatch();

    const toggleAdmin = () => {
        dispatch(setIsAdmin(!isAdmin));
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
            }}
        >
            <FormGroup>
                <FormControlLabel
                    control={<Switch onClick={toggleAdmin} />}
                    label="admin view"
                />
            </FormGroup>
        </Box>
    );
};

export default AdminToggle;
