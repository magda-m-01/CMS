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
    getAllTables,
    addTable,
    editTable,
    deleteTable,
} from "../../api/tables";
import { useSelector } from "react-redux";

const TablesAdmin = () => {
    const [tables, setTables] = useState([]);
    const [newMaximumNumberOfPeople, setNewMaximumNumberOfPeople] =
        useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = useSelector((state) => state.auth.token);

    const fetchTables = async () => {
        try {
            const response = await getAllTables(token);
            setTables(response.data);
        } catch (error) {
            console.error("Error fetching tables:", error);
        }
    };

    const handleAddNewTable = async () => {
        if (newMaximumNumberOfPeople < 0) {
            setErrorMessage("Number of people cannot be negative.");
            return;
        }
        try {
            const response = await addTable(token, {
                maximumNumberOfPeople: newMaximumNumberOfPeople,
            });
            setTables([...tables, response.data]);
            setNewMaximumNumberOfPeople("");
            setErrorMessage("");
        } catch (error) {
            console.error("Error adding table:", error);
        }
    };

    const handleEditTable = async (id) => {
        if (editingValue < 0) {
            setErrorMessage("Number of people cannot be negative.");
            return;
        }
        try {
            await editTable(token, { id, maximumNumberOfPeople: editingValue });
            setTables(
                tables.map((table) =>
                    table.id === id
                        ? { ...table, maximumNumberOfPeople: editingValue }
                        : table
                )
            );
            setEditingId(null);
            setEditingValue("");
            setErrorMessage("");
        } catch (error) {
            console.error("Error editing table:", error);
        }
    };

    const handleDeleteTable = async (id) => {
        try {
            await deleteTable(token, id);
            setTables(tables.filter((table) => table.id !== id));
        } catch (error) {
            console.error("Error deleting table:", error);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Table Number</TableCell>
                            <TableCell>Maximum Number of People</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tables.map((table, index) => (
                            <TableRow key={table.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {editingId === table.id ? (
                                        <TextField
                                            value={editingValue}
                                            onChange={(e) =>
                                                setEditingValue(e.target.value)
                                            }
                                            type="number"
                                            error={editingValue < 0}
                                            helperText={
                                                editingValue < 0
                                                    ? "Number of people cannot be negative."
                                                    : ""
                                            }
                                        />
                                    ) : (
                                        table.maximumNumberOfPeople
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === table.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    handleEditTable(table.id)
                                                }
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditingValue("");
                                                    setErrorMessage("");
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => {
                                                    setEditingId(table.id);
                                                    setEditingValue(
                                                        table.maximumNumberOfPeople
                                                    );
                                                    setErrorMessage("");
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteTable(table.id)
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
                    label="Maximum Number of People"
                    type="number"
                    value={newMaximumNumberOfPeople}
                    onChange={(e) =>
                        setNewMaximumNumberOfPeople(e.target.value)
                    }
                    fullWidth
                    error={newMaximumNumberOfPeople < 0}
                    helperText={
                        newMaximumNumberOfPeople < 0
                            ? "Number of people cannot be negative."
                            : errorMessage
                    }
                />
                <Button
                    variant="contained"
                    onClick={handleAddNewTable}
                    sx={{ minWidth: 300 }}
                >
                    Add New Table
                </Button>
            </div>
        </div>
    );
};

export default TablesAdmin;
