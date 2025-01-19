import "./App.css";
import NavBar from "./components/navbar/NavBar";
import AdminToggle from "./components/AdminToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import Login from "./pages/Login";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ? (
        <Router>
            <AdminToggle />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    ) : (
        <Login />
    );
}

export default App;
