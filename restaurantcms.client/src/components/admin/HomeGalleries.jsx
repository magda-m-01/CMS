import React, { useEffect, useState } from "react";
import {
    getAllHomeGalleries,
    deleteHomeGallery,
    addHomeGallery,
} from "../../api/homeGallery";
import { useSelector } from "react-redux";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardActions,
    Button,
    TextField,
    Typography,
    CircularProgress,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HomeGalleries = () => {
    const token = useSelector((state) => state.auth.token);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState(null);

    const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            const gallery = await getAllHomeGalleries(token);
            setPhotos(gallery.data);
        } catch (err) {
            setError("Failed to fetch gallery. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddPhoto = async () => {
        if (!photoUrl.trim()) {
            setError("Photo URL cannot be empty.");
            return;
        }
        setError(null);
        try {
            await addHomeGallery(token, { photoPath: photoUrl });
            setPhotoUrl("");
            fetchPhotos();
        } catch (err) {
            setError("Failed to add photo. Please try again later.");
        }
    };

    const handleDeletePhoto = async (id) => {
        try {
            await deleteHomeGallery(token, id);
            fetchPhotos();
        } catch (err) {
            setError("Failed to delete photo. Please try again later.");
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Home Gallery
            </Typography>

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    label="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddPhoto}
                >
                    Add Photo
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {photos.map((photo) => (
                        <Grid item xs={12} sm={6} md={4} key={photo.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={photo.photoPath}
                                    alt="Gallery Photo"
                                />
                                <CardActions>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            handleDeletePhoto(photo.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default HomeGalleries;
