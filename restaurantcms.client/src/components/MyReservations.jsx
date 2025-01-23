import { Box, Button } from "@mui/material";
import React from "react";

const MyReservations = ({ setShowMyReservations }) => {
    return (
        <Box>
            <Button onClick={() => setShowMyReservations(false)}>
                make a new reservation
            </Button>
        </Box>
    );
};

export default MyReservations;
