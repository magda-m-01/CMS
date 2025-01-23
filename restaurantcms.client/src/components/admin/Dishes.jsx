import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    Alert,
    Snackbar,
} from "@mui/material";
import { getAllDishes, editDish, addDish, deleteDish } from "../../api/dish";
import { getAllFoodCategories } from "../../api/foodCategory"; // Assuming this function exists
import { useSelector } from "react-redux";

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newIsDishOfDay, setNewIsDishOfDay] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [newIngredients, setNewIngredients] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingDishId, setEditingDishId] = useState(null);
    const [editingDishDetails, setEditingDishDetails] = useState({
        name: "",
        price: 0,
        isDishOfDay: false,
        categoryId: "",
        ingredients: "",
    });
    const [error, setError] = useState(null); // To store error messages
    const token = useSelector((state) => state.auth.token);

    // Fetch dishes
    const fetchDishes = async () => {
        try {
            const response = await getAllDishes(token);
            setDishes(response.data);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await getAllFoodCategories(token);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const validateIngredients = (ingredients) => {
        // Check if ingredients are in the format of comma-separated values
        const regex = /^[a-zA-Z0-9\s,]+$/; // Only letters, numbers, spaces, and commas allowed
        return regex.test(ingredients);
    };

    const handleEditDish = (dish) => {
        setEditingDishId(dish.id);
        setEditingDishDetails({
            name: dish.name,
            price: dish.price,
            isDishOfDay: dish.isDishOfDay,
            categoryId: dish.category ? dish.category.id : "",
            ingredients: dish.ingredients || "",
        });
    };

    const handleSaveDish = async () => {
        // Validate ingredients before saving
        if (!validateIngredients(editingDishDetails.ingredients)) {
            setError("Ingredients should be a comma-separated list.");
            return;
        }

        try {
            const selectedCategory = categories.find(
                (category) => category.id === editingDishDetails.categoryId
            );

            const response = await editDish(token, {
                id: editingDishId,
                name: editingDishDetails.name,
                price: editingDishDetails.price,
                isDishOfDay: editingDishDetails.isDishOfDay,
                category: { name: selectedCategory.name },
                ingredients: editingDishDetails.ingredients,
            });

            setDishes(
                dishes.map((dish) =>
                    dish.id === editingDishId
                        ? {
                              ...dish,
                              name: editingDishDetails.name,
                              price: editingDishDetails.price,
                              isDishOfDay: editingDishDetails.isDishOfDay,
                              category: selectedCategory,
                              ingredients: editingDishDetails.ingredients,
                          }
                        : dish
                )
            );
            setEditingDishId(null);
            setEditingDishDetails({
                name: "",
                price: 0,
                isDishOfDay: false,
                categoryId: "",
                ingredients: "",
            });
        } catch (error) {
            console.error("Error saving dish:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingDishId(null);
        setEditingDishDetails({
            name: "",
            price: 0,
            isDishOfDay: false,
            categoryId: "",
            ingredients: "",
        });
    };

    const handleDeleteDish = async (id) => {
        try {
            await deleteDish(token, id);
            setDishes(dishes.filter((dish) => dish.id !== id));
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    const handleAddNewDish = async () => {
        // Validate ingredients before adding
        if (!validateIngredients(newIngredients)) {
            setError("Ingredients should be a comma-separated list.");
            return;
        }

        try {
            const selectedCategory = categories.find(
                (category) => category.id === newCategory
            );

            const response = await addDish(token, {
                name: newDish,
                price: newPrice,
                isDishOfDay: newIsDishOfDay,
                category: { name: selectedCategory.name },
                ingredients: newIngredients,
            });

            setDishes([...dishes, response.data]);
            setNewDish("");
            setNewPrice(0);
            setNewIsDishOfDay(false);
            setNewCategory("");
            setNewIngredients(""); // Reset ingredients field
        } catch (error) {
            console.error("Error adding dish:", error);
        }
    };

    useEffect(() => {
        fetchDishes();
        fetchCategories();
    }, []);

    return (
        <div>
            {/* Error Snackbar */}
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
                            <TableCell>Dish Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Dish of the Day</TableCell>
                            <TableCell>Ingredients</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dishes.map((dish) => (
                            <TableRow key={dish.id}>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <TextField
                                            value={editingDishDetails.name}
                                            onChange={(e) =>
                                                setEditingDishDetails({
                                                    ...editingDishDetails,
                                                    name: e.target.value,
                                                })
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        dish.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <TextField
                                            type="number"
                                            value={editingDishDetails.price}
                                            onChange={(e) =>
                                                setEditingDishDetails({
                                                    ...editingDishDetails,
                                                    price: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        dish.price
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <FormControl sx={{ minWidth: 150 }}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={
                                                    editingDishDetails.categoryId
                                                }
                                                onChange={(e) =>
                                                    setEditingDishDetails({
                                                        ...editingDishDetails,
                                                        categoryId:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        dish.category && dish.category.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        editingDishDetails.isDishOfDay
                                                    }
                                                    onChange={(e) =>
                                                        setEditingDishDetails({
                                                            ...editingDishDetails,
                                                            isDishOfDay:
                                                                e.target
                                                                    .checked,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Dish of the Day"
                                        />
                                    ) : dish.isDishOfDay ? (
                                        "Yes"
                                    ) : (
                                        "No"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <TextField
                                            value={
                                                editingDishDetails.ingredients
                                            }
                                            onChange={(e) =>
                                                setEditingDishDetails({
                                                    ...editingDishDetails,
                                                    ingredients: e.target.value,
                                                })
                                            }
                                            fullWidth
                                            label="Ingredients (comma separated)"
                                        />
                                    ) : (
                                        dish.ingredients
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingDishId === dish.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                onClick={handleSaveDish}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={handleCancelEdit}
                                                style={{ marginLeft: "8px" }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    handleEditDish(dish)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteDish(dish.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* "Add New Dish" Section */}
            <div
                style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <TextField
                    label="New Dish Name"
                    value={newDish}
                    onChange={(e) => setNewDish(e.target.value)}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Ingredients (comma separated)"
                    value={newIngredients}
                    onChange={(e) => setNewIngredients(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newIsDishOfDay}
                            onChange={(e) =>
                                setNewIsDishOfDay(e.target.checked)
                            }
                        />
                    }
                    label="Dish of the Day"
                />
                <Button
                    variant="contained"
                    onClick={handleAddNewDish}
                    sx={{ minWidth: 150 }}
                >
                    Add New Dish
                </Button>
            </div>
        </div>
    );
};

export default Dishes;
