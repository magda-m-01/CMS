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
    getAllRestaurantStaff,
    addRestaurantStaff,
    editRestaurantStaff,
    deleteRestaurantStaff,
} from "../../api/restaurantStaff";
import { useSelector } from "react-redux";

const RestaurantStaffAdmin = () => {
    const [staff, setStaff] = useState([]);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const token = useSelector((state) => state.auth.token);

    const fetchStaff = async () => {
        try {
            const response = await getAllRestaurantStaff(token);
            setStaff(response.data);
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const handleEditStaff = (id, name, description) => {
        setEditingStaffId(id);
        setEditingName(name);
        setEditingDescription(description);
    };

    const handleSaveStaff = async (id) => {
        try {
            await editRestaurantStaff(token, {
                id,
                name: editingName,
                description: editingDescription,
            });
            setStaff(
                staff.map((member) =>
                    member.id === id
                        ? {
                              ...member,
                              name: editingName,
                              description: editingDescription,
                          }
                        : member
                )
            );
            setEditingStaffId(null);
            setEditingName("");
            setEditingDescription("");
        } catch (error) {
            console.error("Error saving staff details:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingStaffId(null);
        setEditingName("");
        setEditingDescription("");
    };

    const handleDeleteStaff = async (id) => {
        try {
            await deleteRestaurantStaff(token, { id });
            setStaff(staff.filter((member) => member.id !== id));
        } catch (error) {
            console.error("Error deleting staff:", error);
        }
    };

    const handleAddNewStaff = async () => {
        try {
            const response = await addRestaurantStaff(token, {
                name: newName,
                description: newDescription,
            });
            setStaff([...staff, response]);
            setNewName("");
            setNewDescription("");
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staff.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>
                                    {editingStaffId === member.id ? (
                                        <TextField
                                            value={editingName}
                                            onChange={(e) =>
                                                setEditingName(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        member.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingStaffId === member.id ? (
                                        <TextField
                                            value={editingDescription}
                                            onChange={(e) =>
                                                setEditingDescription(
                                                    e.target.value
                                                )
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        member.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingStaffId === member.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    handleSaveStaff(member.id)
                                                }
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
                                                    handleEditStaff(
                                                        member.id,
                                                        member.name,
                                                        member.description
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteStaff(member.id)
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
                    gap: 5,
                }}
            >
                <TextField
                    label="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    onClick={handleAddNewStaff}
                    sx={{ minWidth: 300 }}
                >
                    Add New Staff
                </Button>
            </div>
        </div>
    );
};

export default RestaurantStaffAdmin;
