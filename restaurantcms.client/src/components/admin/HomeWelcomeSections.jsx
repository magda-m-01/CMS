import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getHomeWelcomeSections,
    editHomeWelcomeSection,
    addHomeWelcomeSection,
    deleteHomeWelcomeSection,
} from "../../api/homeWelcomeSection";
import {
    Box,
    Button,
    Typography,
    TextField,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Alert,
} from "@mui/material";

const HomeWelcomeSections = () => {
    const token = useSelector((state) => state.auth.token);
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [editData, setEditData] = useState({
        id: null,
        photoUrl: "",
        content: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        if (!editData.photoUrl.trim()) {
            setErrorMessage("Photo URL is required to add a section.");
            return;
        }

        try {
            const newSection = {
                photoUrl: editData.photoUrl,
                content: editData.content,
            };
            const response = await addHomeWelcomeSection(token, newSection);
            setSections([...sections, response.data]);
            setIsAdding(false);
            setEditData({ id: null, photoUrl: "", content: "" });
            setErrorMessage("");
        } catch (error) {
            console.error("Failed to add section", error);
            setErrorMessage("Failed to add section. Please try again.");
        }
    };

    const handleEditSection = async () => {
        try {
            await editHomeWelcomeSection(token, editData);
            setSections((prev) =>
                prev.map((section) =>
                    section.id === editData.id
                        ? { ...section, ...editData }
                        : section
                )
            );
            setEditingSectionId(null);
        } catch (error) {
            console.error("Failed to edit section", error);
        }
    };

    const handleDeleteSection = async (id) => {
        try {
            await deleteHomeWelcomeSection(token, id);
            setSections(sections.filter((section) => section.id !== id));
        } catch (error) {
            console.error("Failed to delete section", error);
        }
    };

    const handleEditClick = (section) => {
        setEditingSectionId(section.id);
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
        <Box padding={4}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setIsAdding(true);
                    setEditData({ id: null, photoUrl: "", content: "" });
                }}
                sx={{ marginBottom: 4 }}
            >
                Add Home Welcome Section
            </Button>

            {sections.map((section) => (
                <Card
                    key={section.id}
                    sx={{
                        marginBottom: 4,
                        position: "relative",
                        overflow: "hidden",
                        height: 200,
                    }}
                >
                    {section.photoUrl && (
                        <CardMedia
                            component="img"
                            image={section.photoUrl}
                            alt="Section Image"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                zIndex: 1,
                                filter: "brightness(0.7)",
                            }}
                        />
                    )}
                    {section.content && (
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
                                color: "white",
                                textAlign: "center",
                                zIndex: 2,
                            }}
                        >
                            <Typography variant="h6">
                                {section.content}
                            </Typography>
                        </CardContent>
                    )}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            zIndex: 3,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditClick(section)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteSection(section.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                </Card>
            ))}

            {isAdding && (
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddSection();
                    }}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{ marginBottom: 4 }}
                >
                    {errorMessage && (
                        <Alert severity="error">{errorMessage}</Alert>
                    )}
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
                        required
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
                            onClick={() => setIsAdding(false)}
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

            {editingSectionId && (
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSection();
                    }}
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
                        required
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
                            onClick={() => setEditingSectionId(null)}
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
