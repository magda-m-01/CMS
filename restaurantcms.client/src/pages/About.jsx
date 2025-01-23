import { useEffect, useState } from "react";
import { getRestaurantDetailsPage } from "../api/pages";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

const About = () => {
    const [details, setDetails] = useState([]);

    const getDetails = async () => {
        const response = await getRestaurantDetailsPage();
        setDetails(response.data);
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <Box sx={{ p: 5, px: 20 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {details.map((detail) => (
                            <TableRow key={detail.id}>
                                <TableCell>{detail.keyName}</TableCell>
                                <TableCell>{detail.keyValue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default About;
