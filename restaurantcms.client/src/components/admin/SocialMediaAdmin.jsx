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
    const [newLogoPath, setNewLogoPath] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [editingLinkId, setEditingLinkId] = useState(null);
    const [editingLinkDetails, setEditingLinkDetails] = useState({
        logoPath: "",
        url: "",
    });
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({
        logoPath: false,
        url: false,
    });
    const token = useSelector((state) => state.auth.token);

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

    const validateFields = () => {
        const errors = {
            logoPath: !newLogoPath && !editingLinkDetails.logoPath,
            url: !newUrl && !editingLinkDetails.url,
        };
        setFormErrors(errors);
        return !errors.logoPath && !errors.url;
    };

    const handleSaveLink = async () => {
        if (!validateFields()) {
            return;
        }

        if (editingLinkId) {
            try {
                const response = await editSocialMedia(token, {
                    id: editingLinkId,
                    logoPath: editingLinkDetails.logoPath,
                    url: editingLinkDetails.url,
                });
                setSocialMediaLinks(
                    socialMediaLinks.map((link) =>
                        link.id === editingLinkId
                            ? {
                                  id: editingLinkId,
                                  logoPath: editingLinkDetails.logoPath,
                                  url: editingLinkDetails.url,
                              }
                            : link
                    )
                );
            } catch (error) {
                console.error("Error saving social media link:", error);
            }
        } else {
            const newLinkData = {
                logoPath: newLogoPath,
                url: newUrl,
            };

            try {
                const response = await addSocialMedia(token, newLinkData);
                setSocialMediaLinks([...socialMediaLinks, response.data]);
                setNewLogoPath("");
                setNewUrl("");
            } catch (error) {
                console.error("Error adding new social media link:", error);
            }
        }

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
                                        verticalAlign: "middle",
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
                                            error={formErrors.logoPath}
                                            helperText={
                                                formErrors.logoPath
                                                    ? "Logo Path is required"
                                                    : ""
                                            }
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
                                        verticalAlign: "middle",
                                        padding: "8px",
                                        wordWrap: "break-word",
                                        maxWidth: "300px",
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
                                            error={formErrors.url}
                                            helperText={
                                                formErrors.url
                                                    ? "URL is required"
                                                    : ""
                                            }
                                        />
                                    ) : (
                                        link.url
                                    )}
                                </TableCell>
                                <TableCell
                                    style={{
                                        verticalAlign: "middle",
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
                    error={formErrors.logoPath}
                    helperText={
                        formErrors.logoPath ? "Logo Path is required" : ""
                    }
                />
                <TextField
                    label="URL"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    error={formErrors.url}
                    helperText={formErrors.url ? "URL is required" : ""}
                />
                <Button variant="contained" onClick={handleSaveLink}>
                    Add New Link
                </Button>
            </div>
        </div>
    );
};

export default SocialMediaAdmin;
