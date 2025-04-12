import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    setAllTableReservationsAdmin,
    deleteTableReservationAdmin,
} from "../../api/tables";
import { useSelector } from "react-redux";

const TableReservationsAdmin = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const fetchReservations = async () => {
        try {
            const response = await setAllTableReservationsAdmin(token);
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setError("Error fetching reservations.");
        }
    };

    const handleDeleteReservation = async (id) => {
        try {
            await deleteTableReservationAdmin(token, id);
            setReservations(
                reservations.filter((reservation) => reservation.id !== id)
            );
        } catch (error) {
            console.error("Error deleting reservation:", error);
            setError("Error deleting reservation.");
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div>
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Table Number</TableCell>
                            <TableCell>Number of people</TableCell>
                            <TableCell>Reservation Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell>{reservation.id}</TableCell>
                                <TableCell>
                                    {reservation.user.userName}
                                </TableCell>
                                <TableCell>{reservation.table.id}</TableCell>
                                <TableCell>
                                    {reservation.numberOfPeople}
                                </TableCell>
                                <TableCell>
                                    {reservation.startTimeOfReservation}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            handleDeleteReservation(
                                                reservation.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableReservationsAdmin;
