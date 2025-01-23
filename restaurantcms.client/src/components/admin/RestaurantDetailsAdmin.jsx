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
} from "@mui/material";
import {
    getRestaurantDetails,
    addRestaurantDetails,
    editRestaurantDetails,
} from "../../api/restaurantDetails";
import { useSelector } from "react-redux";

const RestaurantDetails = () => {
    const [details, setDetails] = useState([]);
    const [newKeyName, setNewKeyName] = useState("");
    const [newKeyValue, setNewKeyValue] = useState("");
    const [editingDetailId, setEditingDetailId] = useState(null);
    const [editingKeyValue, setEditingKeyValue] = useState("");
    const token = useSelector((state) => state.auth.token);

    const fetchDetails = async () => {
        try {
            const response = await getRestaurantDetails(token);
            let adjustedDetails;
            if (typeof response.data === "string") {
                adjustedDetails = []; // If it's a string, set to an empty array
            } else if (
                typeof response.data === "object" &&
                !Array.isArray(response.data)
            ) {
                adjustedDetails = [response.data]; // If it's an object, wrap it in an array
            } else if (Array.isArray(response.data)) {
                adjustedDetails = response.data; // If it's already an array, leave it as is
            } else {
                adjustedDetails = []; // Fallback in case of unexpected data
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
        } catch (error) {
            console.error("Error adding restaurant detail:", error);
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
                }}
            >
                <TextField
                    label="Key Name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    fullWidth
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
