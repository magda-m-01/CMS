import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { useSelector } from "react-redux";
import { getRestaurantStaffPage } from "../api/pages";

const RestaurantStaff = () => {
    const [staff, setStaff] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const fetchStaff = async () => {
        try {
            const response = await getRestaurantStaffPage(token);
            setStaff(response.data);
        } catch (error) {
            console.error("Failed to fetch restaurant staff:", error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography
                sx={{
                    color: "#111",
                    marginBottom: "30px",
                    width: "100%",
                    textAlign: "left",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "20px",
                }}
            >
                Restaurant Staff
            </Typography>
            <Grid container spacing={4}>
                {staff.map((member) => (
                    <Grid item xs={12} sm={6} md={3} key={member.id}>
                        <Card
                            sx={{
                                background: "rgba(240, 248, 255, 0.9)", // Light blue background
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                borderRadius: "15px",
                                overflow: "hidden",
                                position: "relative",
                                border: "3px solid rgba(100, 181, 246, 0.8)", // Light blue border
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: 2,
                                }}
                            >
                                <Chip
                                    icon={<WorkIcon />}
                                    label="Staff Member"
                                    color="primary"
                                    variant="filled"
                                    sx={{
                                        backgroundColor: "#64b5f6", // Blue color
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>

                            <CardContent>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <PersonIcon
                                        sx={{
                                            fontSize: 50,
                                            color: "#42a5f5", // Blue color
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        {member.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RestaurantStaff;
