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
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    addTableReservation,
    getAllTableReservations,
    getAllTables,
} from "../api/tables";
import MyReservations from "../components/MyReservations";

const TableReservations = () => {
    const [tables, setTables] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [showTables, setShowTables] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const [showMyReservations, setShowMyReservations] = useState(true);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const tablesResponse = await getAllTables(token);
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

    const generateTimeSlots = (selectedDate) => {
        const now = new Date();
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const slots = [];
        for (
            let time = startOfDay;
            time <= endOfDay;
            time.setMinutes(time.getMinutes() + 30)
        ) {
            if (time > now) {
                slots.push(new Date(time)); // Only add future slots
            }
        }
        setTimeSlots(slots);
    };

    const filterAvailableTables = (
        selectedDate,
        selectedTime,
        selectedNumberOfPeople
    ) => {
        if (!selectedDate || !selectedTime || !selectedNumberOfPeople) return;

        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);

        console.log("reservations", reservations);
        const filteredReservations = reservations.filter((reservation) => {
            const reservationDateTime = new Date(
                reservation.startTimeOfReservation
            );
            return (
                reservationDateTime.getTime() === selectedDateTime.getTime() &&
                reservation.numberOfPeople === Number(selectedNumberOfPeople)
            );
        });

        const takenTableIds = filteredReservations.map(
            (reservation) => reservation.tableId
        );

        const availableTables = tables.filter(
            (table) =>
                !takenTableIds.includes(table.id) &&
                table.maximumNumberOfPeople >= selectedNumberOfPeople
        );

        setAvailableTables(availableTables);
        setShowTables(true); // Show tables after filtering
    };

    const isTableTaken = (tableId) => {
        return reservations.some(
            (reservation) =>
                reservation.tableId === tableId &&
                reservation.date === date &&
                reservation.time === time &&
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
            console.log("date", date);
            console.log("time", time);
            await addTableReservation(token, {
                tableId: selectedTable.id,
                numberOfPeople: numberOfPeople,
                date: `${date}T${time}:00`, // Combine date and time for the reservation
            });
            setSuccessMessage(
                `Table ${selectedTable.id} reserved successfully!`
            );
            setShowSnackbar(true);
        } catch (error) {
            console.error("Error making reservation:", error);
        }
        setShowMyReservations(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "date") {
            setDate(value);
            generateTimeSlots(value); // Generate available time slots when date changes
        } else if (name === "time") {
            setTime(value);
        } else if (name === "numberOfPeople") {
            setNumberOfPeople(value);
        }
    };

    return (
        <Box>
            {showMyReservations ? (
                <MyReservations setShowMyReservations={setShowMyReservations} />
            ) : (
                <div>
                    <Box sx={{ display: "flex" }}>
                        <IconButton onClick={() => setShowMyReservations(true)}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography variant="h4" gutterBottom>
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
                                    min: new Date().toISOString().split("T")[0], // Disable past dates
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
                        <Grid item xs={6}>
                            <Select
                                label="Reservation Time"
                                name="time"
                                value={time}
                                onChange={handleInputChange}
                                fullWidth
                                displayEmpty
                                sx={{ marginTop: 2 }}
                            >
                                <MenuItem value="" disabled>
                                    Select a time
                                </MenuItem>
                                {timeSlots.map((slot, index) => (
                                    <MenuItem
                                        key={index}
                                        value={slot.toTimeString().slice(0, 5)}
                                    >
                                        {slot.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() =>
                            filterAvailableTables(date, time, numberOfPeople)
                        }
                        disabled={!date || !time || !numberOfPeople}
                    >
                        Show Available Tables
                    </Button>

                    {loading ? (
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
                                        const isTaken = isTableTaken(table.id);
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
                                                        alignItems: "center",
                                                        padding: 2,
                                                        cursor: isTaken
                                                            ? "not-allowed"
                                                            : "pointer",
                                                        border: isSelected
                                                            ? "3px solid blue"
                                                            : "2px solid blue",
                                                        backgroundColor:
                                                            isSelected
                                                                ? "blue"
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
                                                                    : "blue",
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
                                                                    : "blue",
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
                                                                    : "blue",
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
                                    disabled={!selectedTable}
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
    );
};

export default TableReservations;
