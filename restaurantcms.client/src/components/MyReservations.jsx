import { Box, Button } from "@mui/material";
import React from "react";

const MyReservations = ({ setShowMyReservations }) => {
    return (
        <Box>
            <Button
                variant="contained"
                onClick={() => setShowMyReservations(false)}
                sx={{ marginInlinet: 5 }}
            >
                make a new reservation
            </Button>
        </Box>
    );
};

export default MyReservations;
