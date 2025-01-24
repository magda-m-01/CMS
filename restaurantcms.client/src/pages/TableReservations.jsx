import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    addTableReservation,
    getAllTableReservations,
    getAllTablesForUser,
    getAvailableTablesForDateAndPeople,
} from "../api/tables";
import MyReservations from "../components/MyReservations";

const TableReservations = () => {
    const [tables, setTables] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [date, setDate] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showTables, setShowTables] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const [showMyReservations, setShowMyReservations] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [clicked, setClicked] = useState(false);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const selectedDateTime = new Date(date);
            selectedDateTime.setHours(12, 0, 0, 0);
            const isoDate = selectedDateTime.toISOString();
            const tablesResponse = await getAvailableTablesForDateAndPeople(
                token,
                { reservationDate: isoDate, numberOfPeople: numberOfPeople }
            );
            const reservationsResponse = await getAllTableReservations(token);

            setTables(tablesResponse.data);
            setReservations(reservationsResponse.data);
        } catch (error) {
            console.error("Error fetching tables and reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const filterAvailableTables = async (
        selectedDate,
        selectedNumberOfPeople
    ) => {
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(12, 0, 0, 0);
        const isoDate = selectedDateTime.toISOString();
        const tablesResponse = await getAvailableTablesForDateAndPeople(token, {
            reservationDate: isoDate,
            numberOfPeople: selectedNumberOfPeople,
        });
        setAvailableTables(tablesResponse.data);
        setShowTables(true);
    };

    const isTableTaken = (tableId) => {
        return reservations.some(
            (reservation) =>
                reservation.tableId === tableId &&
                reservation.date === date &&
                reservation.numberOfPeople === numberOfPeople
        );
    };

    const handleTableSelect = (table) => {
        setSelectedTable(table);
    };

    const handleReservation = async () => {
        if (!selectedTable) {
            alert("Please select a table to reserve.");
            return;
        }

        try {
            const selectedDateTime = new Date(date);
            if (isNaN(selectedDateTime)) {
                alert("Please select a valid date.");
                return;
            }

            selectedDateTime.setHours(12, 0, 0, 0);
            const isoDate = selectedDateTime.toISOString();

            await addTableReservation(token, {
                tableId: selectedTable.id,
                numberOfPeople: numberOfPeople,
                startTimeOfReservation: isoDate,
            });

            setSuccessMessage(
                `Table ${selectedTable.id} reserved successfully for ${date}!`
            );
            setShowSnackbar(true);
        } catch (error) {
            console.error("Error making reservation:", error);
        }
        setShowMyReservations(true);
        setAvailableTables([]);
    };

    const handleInputChange = (e) => {
        setAvailableTables([]);
        const { name, value } = e.target;

        if (name === "date") {
            setDate(value);
        } else if (name === "numberOfPeople") {
            setNumberOfPeople(value);
        }
    };

    return (
        isLoggedIn && (
            <Box sx={{ p: 2, py: 5 }}>
                {showMyReservations ? (
                    <MyReservations
                        setShowMyReservations={setShowMyReservations}
                    />
                ) : (
                    <div>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "left",
                                mb: 2,
                            }}
                        >
                            <IconButton
                                onClick={() => setShowMyReservations(true)}
                                sx={{ width: "20px", height: "20px" }}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h4">
                                Table Reservations
                            </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                            <Grid item xs={6}>
                                <TextField
                                    type="date"
                                    label="Reservation Date"
                                    fullWidth
                                    name="date"
                                    value={date}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    label="Number of People"
                                    fullWidth
                                    name="numberOfPeople"
                                    value={numberOfPeople}
                                    onChange={handleInputChange}
                                    inputProps={{
                                        min: 1,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                filterAvailableTables(date, numberOfPeople);
                                setClicked(true);
                            }}
                            disabled={!date || !numberOfPeople}
                        >
                            Show Available Tables
                        </Button>

                        {clicked && availableTables.length === 0 ? (
                            <Box sx={{ mt: 6 }}>
                                No available tables for that date and number of
                                people
                            </Box>
                        ) : loading ? (
                            <CircularProgress sx={{ marginTop: 3 }} />
                        ) : (
                            <>
                                {showTables && (
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{ marginTop: 3 }}
                                    >
                                        {availableTables.map((table) => {
                                            const isTaken = isTableTaken(
                                                table.id
                                            );
                                            const isSelected =
                                                selectedTable?.id === table.id;

                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    key={table.id}
                                                >
                                                    <Card
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            padding: 2,
                                                            cursor: isTaken
                                                                ? "not-allowed"
                                                                : "pointer",
                                                            border: isSelected
                                                                ? "3px solid"
                                                                : "2px solid",
                                                            borderColor:
                                                                "primary.main",
                                                            backgroundColor:
                                                                isSelected
                                                                    ? "primary.main"
                                                                    : "transparent",
                                                        }}
                                                        onClick={
                                                            !isTaken
                                                                ? () =>
                                                                      handleTableSelect(
                                                                          table
                                                                      )
                                                                : null
                                                        }
                                                    >
                                                        <CardContent>
                                                            <TableBarIcon
                                                                sx={{
                                                                    fontSize: 50,
                                                                    color: isSelected
                                                                        ? "white"
                                                                        : "primary.main",
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    marginTop: 1,
                                                                    color: isTaken
                                                                        ? "text.disabled"
                                                                        : isSelected
                                                                        ? "white"
                                                                        : "primary.main",
                                                                }}
                                                            >
                                                                Table {table.id}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: isTaken
                                                                        ? "text.disabled"
                                                                        : isSelected
                                                                        ? "white"
                                                                        : "primary.main",
                                                                }}
                                                            >
                                                                <EventSeatIcon
                                                                    sx={{
                                                                        fontSize: 16,
                                                                    }}
                                                                />
                                                                {
                                                                    table.maximumNumberOfPeople
                                                                }{" "}
                                                                Seats
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )}

                                {showTables && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        sx={{ marginTop: 3 }}
                                        onClick={handleReservation}
                                        disabled={
                                            !selectedTable ||
                                            availableTables.length === 0
                                        }
                                    >
                                        Reserve Table
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                )}
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setShowSnackbar(false)}
                >
                    <Alert
                        onClose={() => setShowSnackbar(false)}
                        severity="success"
                    >
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Box>
        )
    );
};

export default TableReservations;
