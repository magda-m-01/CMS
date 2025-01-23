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
import { getAllTables, addTable } from "../../api/tables";
import { useSelector } from "react-redux";

const TablesAdmin = () => {
    const [tables, setTables] = useState([]);
    const [newMaximumNumberOfPeople, setNewMaximumNumberOfPeople] =
        useState("");
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
        try {
            const response = await addTable(token, {
                maximumNumberOfPeople: newMaximumNumberOfPeople,
            });
            console.log("response", response);
            setTables([...tables, response.data]);
            setNewMaximumNumberOfPeople("");
        } catch (error) {
            console.error("Error adding table:", error);
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tables.map((table, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {table.maximumNumberOfPeople}
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
