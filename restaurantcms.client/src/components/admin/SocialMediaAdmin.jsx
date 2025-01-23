import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    getAllSocialMedia,
    addSocialMedia,
    editSocialMedia,
    deleteSocialMedia,
} from "../../api/socialMedia";
import { useSelector } from "react-redux";

const SocialMediaAdmin = () => {
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [newLogoPath, setNewLogoPath] = useState(""); // Logo URL for new social media
    const [newUrl, setNewUrl] = useState(""); // URL for new social media link
    const [editingLinkId, setEditingLinkId] = useState(null); // ID of the link currently being edited
    const [editingLinkDetails, setEditingLinkDetails] = useState({
        logoPath: "",
        url: "",
    });
    const [error, setError] = useState(null); // To store error messages
    const token = useSelector((state) => state.auth.token);

    // Fetch social media links
    const fetchSocialMediaLinks = async () => {
        try {
            const response = await getAllSocialMedia(token);
            setSocialMediaLinks(response.data);
        } catch (error) {
            console.error("Error fetching social media links:", error);
        }
    };

    useEffect(() => {
        fetchSocialMediaLinks();
    }, []);

    const handleEditLink = (link) => {
        setEditingLinkId(link.id);
        setEditingLinkDetails({ logoPath: link.logoPath, url: link.url });
    };

    const handleSaveLink = async () => {
        // If editing an existing link
        if (editingLinkId) {
            try {
                const response = await editSocialMedia(
                    token,
                    editingLinkId,
                    editingLinkDetails
                );
                setSocialMediaLinks(
                    socialMediaLinks.map((link) =>
                        link.id === editingLinkId
                            ? { ...link, ...editingLinkDetails }
                            : link
                    )
                );
            } catch (error) {
                console.error("Error saving social media link:", error);
            }
        } else {
            // If adding a new link
            const newLinkData = {
                logoPath: newLogoPath, // The logo path for the new social media link
                url: newUrl, // The URL for the new social media link
            };

            try {
                const response = await addSocialMedia(token, newLinkData);
                setSocialMediaLinks([...socialMediaLinks, response.data]);
                setNewLogoPath(""); // Clear the input for the new logo path
                setNewUrl(""); // Clear the input for the new URL
            } catch (error) {
                console.error("Error adding new social media link:", error);
            }
        }

        // Reset after save
        setEditingLinkId(null);
        setEditingLinkDetails({ logoPath: "", url: "" });
    };

    const handleCancelEdit = () => {
        setEditingLinkId(null);
        setEditingLinkDetails({ logoPath: "", url: "" });
    };

    const handleDeleteLink = async (id) => {
        try {
            await deleteSocialMedia(token, id);
            setSocialMediaLinks(
                socialMediaLinks.filter((link) => link.id !== id)
            );
        } catch (error) {
            console.error("Error deleting social media link:", error);
        }
    };

    return (
        <div>
            {/* Error Snackbar */}
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>

            <TableContainer
                component={Paper}
                style={{ maxHeight: 500, overflowY: "auto" }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Logo</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {socialMediaLinks.map((link) => (
                            <TableRow key={link.id}>
                                <TableCell
                                    style={{
                                        verticalAlign: "middle", // Align the content vertically in the middle
                                        padding: "8px",
                                    }}
                                >
                                    {editingLinkId === link.id ? (
                                        <TextField
                                            value={editingLinkDetails.logoPath}
                                            onChange={(e) =>
                                                setEditingLinkDetails({
                                                    ...editingLinkDetails,
                                                    logoPath: e.target.value,
                                                })
                                            }
                                            fullWidth
                                            label="Logo Path"
                                        />
                                    ) : (
                                        <img
                                            src={link.logoPath}
                                            alt={`${link.url} logo`}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                objectFit: "contain",
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell
                                    style={{
                                        verticalAlign: "middle", // Align the content vertically in the middle
                                        padding: "8px",
                                        wordWrap: "break-word", // Allow text wrapping within the cell
                                        maxWidth: "300px", // Limit the column width
                                    }}
                                >
                                    {editingLinkId === link.id ? (
                                        <TextField
                                            value={editingLinkDetails.url}
                                            onChange={(e) =>
                                                setEditingLinkDetails({
                                                    ...editingLinkDetails,
                                                    url: e.target.value,
                                                })
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        link.url
                                    )}
                                </TableCell>
                                <TableCell
                                    style={{
                                        verticalAlign: "middle", // Align the content vertically in the middle
                                    }}
                                >
                                    {editingLinkId === link.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                onClick={handleSaveLink}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={handleCancelEdit}
                                                style={{ marginLeft: "8px" }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    handleEditLink(link)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteLink(link.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* "Add New Social Media Link" Section */}
            <div
                style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <TextField
                    label="Logo Path"
                    value={newLogoPath}
                    onChange={(e) => setNewLogoPath(e.target.value)}
                />
                <TextField
                    label="URL"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                />
                <Button variant="contained" onClick={handleSaveLink}>
                    Add New Link
                </Button>
            </div>
        </div>
    );
};

export default SocialMediaAdmin;
