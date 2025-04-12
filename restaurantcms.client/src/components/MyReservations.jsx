import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getAllTableReservationsOfSingleUser,
    deleteTableReservation,
} from "../api/tables";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    CircularProgress,
    Box,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TableBarIcon from "@mui/icons-material/TableBar";

const MyReservations = ({ setShowMyReservations }) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openDialog, setOpenDialog] = useState(false); // For the dialog
    const [reservationToDelete, setReservationToDelete] = useState(null); // Store the reservation to delete
    const token = useSelector((state) => state.auth.token);

    const fetchMyReservations = async () => {
        setLoading(true);
        try {
            const response = await getAllTableReservationsOfSingleUser(token);
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setErrorMessage("Failed to load reservations.");
            setShowSnackbar(true);
            setSnackbarSeverity("error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyReservations();
    }, [token]);

    const handleDelete = async () => {
        if (!reservationToDelete) return;

        try {
            await deleteTableReservation(token, reservationToDelete);
            setErrorMessage("Reservation deleted successfully.");
            setSnackbarSeverity("success");
            setShowSnackbar(true);
            fetchMyReservations(); // Refresh the reservations after deletion
        } catch (error) {
            console.error("Error deleting reservation:", error);
            setErrorMessage("Failed to delete reservation.");
            setSnackbarSeverity("error");
            setShowSnackbar(true);
        } finally {
            setOpenDialog(false); // Close the dialog after the action
        }
    };

    const openConfirmationDialog = (reservationId) => {
        setReservationToDelete(reservationId); // Set the reservation to delete
        setOpenDialog(true); // Open the confirmation dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    return (
        <Box>
            <Box sx={{ p: 2 }}>
                {loading ? (
                    <CircularProgress sx={{ marginTop: 3 }} />
                ) : (
                    <Grid container spacing={2}>
                        {reservations.length === 0 ? (
                            <Typography
                                variant="h6"
                                sx={{ color: "text.secondary" }}
                            >
                                {`You don't have any reservations yet.`}
                            </Typography>
                        ) : (
                            reservations.map((reservation) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={reservation.id}
                                >
                                    <Card
                                        sx={{
                                            padding: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CardContent>
                                            <TableBarIcon
                                                sx={{
                                                    fontSize: 50,
                                                    color: "primary.main",
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    marginTop: 1,
                                                    color: "primary.main",
                                                }}
                                            >
                                                Table {reservation.table.id}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                <EventSeatIcon
                                                    sx={{
                                                        fontSize: 16,
                                                        marginRight: 1,
                                                    }}
                                                />
                                                {reservation.numberOfPeople}{" "}
                                                Seats
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    marginTop: 1,
                                                }}
                                            >
                                                Reservation Date:{" "}
                                                {new Date(
                                                    reservation.startTimeOfReservation
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>

                                        {/* Delete button */}
                                        <Box sx={{ marginTop: 2 }}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    openConfirmationDialog(
                                                        reservation.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                )}
            </Box>

            <Button
                variant="contained"
                onClick={() => setShowMyReservations(false)}
                sx={{ marginInline: 5 }}
            >
                Make a New Reservation
            </Button>

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>

            {/* Dialog for deletion confirmation */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this reservation?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyReservations;
