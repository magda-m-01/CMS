import React, { useState } from "react";
import {
    Typography,
    Button,
    Modal,
    Box,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { addTableReservation } from "../api/tables";
import { useSelector } from "react-redux";

const TableReservationModal = ({
    open,
    onClose,
    selectedTable,
    setSuccessMessage,
}) => {
    const [timeSlots, setTimeSlots] = useState([]); // Store available time slots
    const [reservationData, setReservationData] = useState({
        numberOfPeople: "",
        date: "",
        time: "",
    });
    const [error, setError] = useState(""); // For validation errors
    const token = useSelector((state) => state.auth.token);

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

    const isValidDateAndTime = () => {
        const selectedDateTime = new Date(
            `${reservationData.date}T${reservationData.time}`
        );
        const now = new Date();

        if (selectedDateTime < now) {
            return false;
        }
        return true;
    };

    const handleSubmitReservation = async () => {
        if (
            !reservationData.numberOfPeople ||
            !reservationData.date ||
            !reservationData.time
        ) {
            alert("Please fill all fields");
            return;
        }

        if (error) {
            alert("Please resolve the errors before submitting.");
            return;
        }

        if (!isValidDateAndTime()) {
            alert("You cannot select a past date or time.");
            return;
        }

        try {
            await addTableReservation(token, {
                tableId: selectedTable.id,
                numberOfPeople: reservationData.numberOfPeople,
                date: `${reservationData.date}T${reservationData.time}`, // Combine date and time
            });
            onClose(); // Close modal after successful reservation
            setSuccessMessage(
                `Table ${selectedTable.id} reserved successfully!`
            );
        } catch (error) {
            console.error("Error making reservation:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setReservationData({
            ...reservationData,
            [name]: value,
        });

        if (name === "numberOfPeople") {
            const numberOfPeople = parseInt(value, 10);

            if (numberOfPeople > selectedTable?.maximumNumberOfPeople) {
                setError(
                    `The maximum capacity for Table ${selectedTable?.id} is ${selectedTable?.maximumNumberOfPeople}.`
                );
            } else {
                setError(""); // Clear error if the input is valid
            }
        }

        if (name === "date") {
            generateTimeSlots(value);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
                setError("");
                setReservationData({
                    numberOfPeople: "",
                    date: "",
                    time: "",
                });
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: 3,
                    boxShadow: 24,
                    width: 400,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Reserve Table {selectedTable?.id}
                </Typography>

                <TextField
                    label="Number of People"
                    type="number"
                    name="numberOfPeople"
                    value={reservationData.numberOfPeople}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        inputProps: {   
                            min: 1,
                            max: selectedTable?.maximumNumberOfPeople,
                        },
                    }}
                    error={!!error} // Show error state if there's an error
                    helperText={error} // Display error message if present
                />

                <TextField
                    label="Reservation Date"
                    type="date"
                    name="date"
                    value={reservationData.date}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={!isValidDateAndTime()} // Show error state if the date is in the past
                    helperText={
                        isValidDateAndTime()
                            ? ""
                            : "Date cannot be in the past."
                    }
                    inputProps={{
                        min: new Date().toISOString().split("T")[0], // Disable past dates
                    }}
                />

                <Select
                    label="Reservation Time"
                    name="time"
                    value={reservationData.time}
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

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmitReservation}
                    sx={{ marginTop: 2 }}
                    disabled={!isValidDateAndTime() || !!error} // Disable submit if date is invalid or there are errors
                >
                    Reserve
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={onClose}
                    sx={{ marginTop: 1 }}
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default TableReservationModal;
