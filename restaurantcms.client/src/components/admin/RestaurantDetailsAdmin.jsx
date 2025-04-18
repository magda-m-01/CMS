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
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getRestaurantDetails,
    addRestaurantDetails,
    editRestaurantDetails,
    deleteRestaurantDetails,
} from "../../api/restaurantDetails";
import { useSelector } from "react-redux";

const RestaurantDetails = () => {
    const [details, setDetails] = useState([]);
    const [newKeyName, setNewKeyName] = useState("");
    const [newKeyValue, setNewKeyValue] = useState("");
    const [editingDetailId, setEditingDetailId] = useState(null);
    const [editingKeyValue, setEditingKeyValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = useSelector((state) => state.auth.token);

    const fetchDetails = async () => {
        try {
            const response = await getRestaurantDetails(token);
            let adjustedDetails;
            if (typeof response.data === "string") {
                adjustedDetails = [];
            } else if (
                typeof response.data === "object" &&
                !Array.isArray(response.data)
            ) {
                adjustedDetails = [response.data];
            } else if (Array.isArray(response.data)) {
                adjustedDetails = response.data;
            } else {
                adjustedDetails = [];
            }

            setDetails(adjustedDetails);
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    const handleEditDetail = (id, keyValue) => {
        setEditingDetailId(id);
        setEditingKeyValue(keyValue);
    };

    const handleSaveDetail = async (id) => {
        try {
            await editRestaurantDetails(token, {
                id: id,
                keyValue: editingKeyValue,
            });
            setDetails(
                details.map((detail) =>
                    detail.id === id
                        ? { ...detail, keyValue: editingKeyValue }
                        : detail
                )
            );
            setEditingDetailId(null);
            setEditingKeyValue("");
        } catch (error) {
            console.error("Error saving restaurant detail:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingDetailId(null);
        setEditingKeyValue("");
    };

    const handleAddNewDetail = async () => {
        try {
            const response = await addRestaurantDetails(token, {
                keyName: newKeyName,
                keyValue: newKeyValue,
            });
            setDetails([...details, response.data]);
            setNewKeyName("");
            setNewKeyValue("");
            setErrorMessage("");
        } catch (error) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data === "Rekord o tym KeyName już istenieje!"
            ) {
                setErrorMessage("Rekord o tym KeyName już istenieje!");
            } else {
                console.error("Error adding restaurant detail:", error);
            }
        }
    };

    const handleDeleteDetail = async (id) => {
        try {
            await deleteRestaurantDetails(token, id);
            setDetails(details.filter((detail) => detail.id !== id));
        } catch (error) {
            console.error("Error deleting restaurant detail:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Key Name</TableCell>
                            <TableCell>Key Value</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.length > 0 &&
                            details.map((detail) => (
                                <TableRow key={detail.id}>
                                    <TableCell>{detail.keyName}</TableCell>
                                    <TableCell>
                                        {editingDetailId === detail.id ? (
                                            <TextField
                                                value={editingKeyValue}
                                                onChange={(e) =>
                                                    setEditingKeyValue(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                            />
                                        ) : (
                                            detail.keyValue
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingDetailId === detail.id ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleSaveDetail(
                                                            detail.id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleCancelEdit}
                                                    style={{
                                                        marginLeft: "8px",
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleEditDetail(
                                                            detail.id,
                                                            detail.keyValue
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <IconButton
                                                    onClick={() =>
                                                        handleDeleteDetail(
                                                            detail.id
                                                        )
                                                    }
                                                    color="error"
                                                    sx={{
                                                        marginLeft: "8px",
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
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
                    gap: 5,
                    flexDirection: "column",
                }}
            >
                <TextField
                    label="Key Name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    fullWidth
                    error={Boolean(errorMessage)}
                    helperText={errorMessage}
                />
                <TextField
                    label="Key Value"
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    onClick={handleAddNewDetail}
                    sx={{ minWidth: 300 }}
                >
                    Add New Detail
                </Button>
            </div>
        </div>
    );
};

export default RestaurantDetails;
