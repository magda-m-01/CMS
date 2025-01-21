import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getHomeWelcomeSections,
    editHomeWelcomeSection,
    addHomeWelcomeSection,
} from "../../api/homeWelcomeSection";
import {
    Box,
    Button,
    Typography,
    TextField,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CircularProgress,
} from "@mui/material";

const HomeWelcomeSections = () => {
    const token = useSelector((state) => state.auth.token);
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        id: null,
        photoUrl: "",
        content: "",
    });

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        setIsLoading(true);
        try {
            const response = await getHomeWelcomeSections(token);
            setSections(response.data || []);
        } catch (error) {
            console.error("Failed to fetch sections", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSection = async () => {
        try {
            const newSection = { photoUrl: "", content: "" }; // Default empty section
            await addHomeWelcomeSection(token, newSection);
            fetchSections();
        } catch (error) {
            console.error("Failed to add section", error);
        }
    };

    const handleEditSection = async () => {
        try {
            await editHomeWelcomeSection(token, editData);
            setIsEditing(false);
            fetchSections();
        } catch (error) {
            console.error("Failed to edit section", error);
        }
    };

    const handleEditClick = (section) => {
        setIsEditing(true);
        setEditData(section);
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box padding={2}>
            {sections.length === 0 ? (
                <Box textAlign="center">
                    <Typography variant="h6" gutterBottom>
                        No home welcome sections available.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSection}
                    >
                        Add Home Welcome Section
                    </Button>
                </Box>
            ) : (
                sections.map((section, key) => (
                    <Box key={key}>
                        <Card
                            key={section.id}
                            sx={{ marginBottom: 2, position: "relative" }}
                        >
                            <CardMedia
                                component="img"
                                image={
                                    section.photoUrl ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Section Image"
                                sx={{
                                    objectFit: "contain",
                                    backgroundColor: "#f0f0f0",
                                }}
                            />
                            <CardContent
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    textAlign: "center",
                                    boxSizing: "border-box",
                                }}
                            >
                                <Typography sx={{ fontSize: "40px" }}>
                                    {section.content || "No content available."}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEditClick(section)}
                            disabled={isEditing}
                        >
                            Edit
                        </Button>
                    </Box>
                ))
            )}

            {isEditing && (
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSection();
                    }}
                    padding={2}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    <TextField
                        label="Photo URL"
                        value={editData.photoUrl}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                photoUrl: e.target.value,
                            })
                        }
                        fullWidth
                    />
                    <TextField
                        label="Content"
                        value={editData.content}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                content: e.target.value,
                            })
                        }
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default HomeWelcomeSections;
