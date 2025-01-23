import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { getRestaurantDetailsPage } from "../api/pages";

const Footer = () => {
    const [details, setDetails] = useState([]);

    // Fetch restaurant details from API
    const getDetails = async () => {
        try {
            const response = await getRestaurantDetailsPage();
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "20px 0",
                mt: 4,
                position: "sticky",
            }}
        >
            {/* Restaurant Details - Aligned to the Left */}
            <Grid
                container
                sx={{
                    paddingLeft: 12,
                    paddingRight: 3,
                    textAlign: "left",
                    py: 2,
                }}
            >
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Restaurant Details
                    </Typography>
                    {details.map((detail) => (
                        <Box key={detail.id} sx={{ marginBottom: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold" }}
                            >
                                {detail.keyName}:
                            </Typography>
                            <Typography variant="body2">
                                {detail.keyValue}
                            </Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* All Rights Reserved - Centered */}
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
