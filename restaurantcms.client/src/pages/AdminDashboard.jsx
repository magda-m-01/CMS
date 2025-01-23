import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Button,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import FoodCategories from "../components/admin/FoodCategories";
import Dishes from "../components/admin/Dishes";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeWelcomeSections from "../components/admin/HomeWelcomeSections";
import HomeGallery from "../components/admin/HomeGalleries";
import RestaurantDetailsAdmin from "../components/admin/RestaurantDetailsAdmin";
import RestaurantStaffAdmin from "../components/admin/RestaurantStaffAdmin";
import TablesAdmin from "../components/admin/TablesAdmin";

const AdminDashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState("details");
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    let navigate = useNavigate();

    const [newDish, setNewDish] = useState({
        name: "",
        price: 0,
        isDishOfDay: false,
        categoryId: 0,
    });

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };

    const handleAddCategory = () => {
        const newCategoryObj = {
            id: categories.length + 1,
            name: newCategory,
            createdAt: new Date().toISOString(),
        };
        setCategories([...categories, newCategoryObj]);
        setNewCategory("");
    };

    const handleAddDish = () => {
        const newDishObj = {
            id: dishes.length + 1,
            name: newDish.name,
            price: newDish.price,
            isDishOfDay: newDish.isDishOfDay,
            category: categories.find(
                (category) => category.id === newDish.categoryId
            ),
            createdAt: new Date().toISOString(),
        };
        setDishes([...dishes, newDishObj]);
        setNewDish({ name: "", price: 0, isDishOfDay: false, categoryId: 0 });
    };

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                    position: "sticky",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "3vh",
                    p: 1,
                    boxSizing: "border-box",
                    gap: 1,
                }}
            >
                <Tooltip title="back">
                    <ArrowBackIosIcon
                        sx={{
                            height: "15px",
                            width: "15px",
                            color: "#fff",
                            cursor: "pointer",
                            px: 1,
                        }}
                        onClick={() => navigate("/")}
                    />
                </Tooltip>
                <Typography color="white">Admin Dashboard</Typography>
            </Box>
            <Box sx={{ display: "flex", height: "97vh" }}>
                <Box
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        "& .MuiBox-paper": {
                            width: 240,
                            boxSizing: "border-box",
                        },
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <List>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("details")}
                        >
                            <ListItemText primary="Restaurant details" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("home")}
                        >
                            <ListItemText primary="Home Welcome Section" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("homeGallery")}
                        >
                            <ListItemText primary="Home Gallery" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("categories")}
                        >
                            <ListItemText primary="Food Categories" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("dishes")}
                        >
                            <ListItemText primary="Dishes" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("staff")}
                        >
                            <ListItemText primary="RestaurantStaff" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuSelect("tables")}
                        >
                            <ListItemText primary="Tables" />
                        </ListItem>
                    </List>
                </Box>

                <Container sx={{ flexGrow: 1, padding: 2 }}>
                    {selectedMenu === "details" && <RestaurantDetailsAdmin />}
                    {selectedMenu === "home" && <HomeWelcomeSections />}
                    {selectedMenu === "homeGallery" && <HomeGallery />}
                    {selectedMenu === "categories" && <FoodCategories />}
                    {selectedMenu === "dishes" && (
                        <Dishes
                            dishes={dishes}
                            setNewDish={setNewDish}
                            newDish={newDish}
                            categories={categories}
                            handleAddDish={handleAddDish}
                        />
                    )}
                    {selectedMenu === "staff" && <RestaurantStaffAdmin />}
                    {selectedMenu === "tables" && <TablesAdmin />}
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
