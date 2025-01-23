import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    Typography,
    CircularProgress,
} from "@mui/material";
import { getHomeGalleriesPage } from "../api/pages";

const HomeGallery = () => {
    const token = useSelector((state) => state.auth.token);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the gallery photos
    const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            const gallery = await getHomeGalleriesPage(token);
            setPhotos(gallery.data);
        } catch (err) {
            setError("Failed to fetch gallery. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#f9f9f9",
                boxSizing: "border-box",
            }}
        >
            {error && (
                <Typography color="error" align="center" gutterBottom>
                    {error}
                </Typography>
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container justifyContent="center">
                    {photos.map((photo) => (
                        <Grid item xs={12} sm={6} md={4} key={photo.id}>
                            <Card elevation={0} sx={{ borderRadius: 0 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={photo.photoPath}
                                    alt="Gallery Photo"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default HomeGallery;
