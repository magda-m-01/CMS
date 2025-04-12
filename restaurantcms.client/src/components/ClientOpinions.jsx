import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    getAllClientsOpinions,
    addClientOpinion,
    deleteClientOpinion,
    editClientOpinion,
} from "../api/clientOpinions";

const ClientOpinions = () => {
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [opinions, setOpinions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newOpinion, setNewOpinion] = useState({ title: "", content: "" });
    const [editingOpinion, setEditingOpinion] = useState(null);

    useEffect(() => {
        const fetchOpinions = async () => {
            try {
                const response = await getAllClientsOpinions(token);
                setOpinions(response.data);
            } catch (err) {
                setError(
                    "Failed to fetch client opinions. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        if (!openEditDialog) fetchOpinions();
    }, [token, openEditDialog]);

    const handleAddOpinion = async () => {
        try {
            const addedOpinion = await addClientOpinion(token, newOpinion);
            setOpinions((prev) => [newOpinion, ...prev]);
            setNewOpinion({ title: "", content: "" });
            setOpenDialog(false);
        } catch (err) {
            setError("Failed to add your review. Please try again later.");
        }
    };

    const handleDeleteOpinion = async (id) => {
        try {
            await deleteClientOpinion(token, id);
            setOpinions((prev) => prev.filter((opinion) => opinion.id !== id));
        } catch (err) {
            setError("Failed to delete the opinion. Please try again later.");
        }
    };

    const handleEditOpinion = (opinion) => {
        setEditingOpinion(opinion);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = async () => {
        try {
            await editClientOpinion(token, {
                id: editingOpinion.id,
                title: editingOpinion.title,
                content: editingOpinion.content,
            });
            setEditingOpinion(null);
            setOpenEditDialog(false);
        } catch (err) {
            setError("Failed to edit the opinion. Please try again later.");
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Client Opinions
            </Typography>
            {isLoggedIn && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                    sx={{ mb: 2 }}
                >
                    Add Your Review
                </Button>
            )}
            <Box display="flex" flexDirection="column" gap={2}>
                {opinions
                    .sort((a, b) => (a.user.userName === username ? -1 : 1))
                    .map((opinion) => (
                        <Card
                            key={opinion.id}
                            sx={{
                                backgroundColor:
                                    opinion.user &&
                                    opinion.user.userName === username
                                        ? "rgba(173, 216, 230, 0.5)"
                                        : "white",
                                textAlign: "left",
                                position: "relative",
                            }}
                        >
                            {isLoggedIn &&
                                opinion.user.userName === username && (
                                    <>
                                        <IconButton
                                            onClick={() =>
                                                handleEditOpinion(opinion)
                                            }
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 48,
                                                color: "primary.main",
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteOpinion(opinion.id)
                                            }
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                color: "error.main",
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            <CardContent>
                                <Typography variant="h6">
                                    {opinion.title || "No Title"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {opinion.content || "No Content"}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    {`By: ${
                                        opinion.user.userName || "Unknown User"
                                    }`}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Box>
            {/* Add Review Dialog */}
            {isLoggedIn && (
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Add Your Review</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={newOpinion.title}
                            onChange={(e) =>
                                setNewOpinion({
                                    ...newOpinion,
                                    title: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={newOpinion.content}
                            onChange={(e) =>
                                setNewOpinion({
                                    ...newOpinion,
                                    content: e.target.value,
                                })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenDialog(false)}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddOpinion}
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {isLoggedIn && (
                <Dialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                >
                    <DialogTitle>Edit Your Review</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={editingOpinion?.title || ""}
                            onChange={(e) =>
                                setEditingOpinion({
                                    ...editingOpinion,
                                    title: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={editingOpinion?.content || ""}
                            onChange={(e) =>
                                setEditingOpinion({
                                    ...editingOpinion,
                                    content: e.target.value,
                                })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenEditDialog(false)}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveEdit}
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ClientOpinions;
