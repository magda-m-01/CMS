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
    getAllClientOpinionsAdmin,
    deleteClientOpinionAdmin,
} from "../../api/clientOpinions";
import { useSelector } from "react-redux";

const ClientOpinionsAdmin = () => {
    const [opinions, setOpinions] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const fetchOpinions = async () => {
        try {
            const response = await getAllClientOpinionsAdmin(token);
            setOpinions(response.data);
        } catch (error) {
            console.error("Error fetching opinions:", error);
            setError("Error fetching opinions.");
        }
    };

    const handleDeleteOpinion = async (id) => {
        try {
            await deleteClientOpinionAdmin(token, id);
            setOpinions(opinions.filter((opinion) => opinion.id !== id));
        } catch (error) {
            console.error("Error deleting opinion:", error);
            setError("Error deleting opinion.");
        }
    };

    useEffect(() => {
        fetchOpinions();
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
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {opinions.map((opinion) => (
                            <TableRow key={opinion.id}>
                                <TableCell>{opinion.title}</TableCell>
                                <TableCell>{opinion.content}</TableCell>
                                <TableCell>{opinion.user.userName}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            handleDeleteOpinion(opinion.id)
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

export default ClientOpinionsAdmin;
