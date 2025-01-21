import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { Box } from "@mui/material";
import Menu from "./pages/Menu";

function App() {
    return (
        <Box sx={{ width: "100vw", boxSizing: "border-box" }}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin_dashboard"
                        element={<AdminDashboard />}
                    />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
