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
} from "@mui/material";
import {
    getAllFoodCategories,
    editFoodCategory,
    addFoodCategory,
    deleteFoodCategory,
} from "../../api/foodCategory";
import { useSelector } from "react-redux";

const FoodCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const fetchCategories = async () => {
        try {
            const response = await getAllFoodCategories(token);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleEditCategory = (id, name) => {
        setEditingCategoryId(id);
        setNewCategory(name);
    };

    const handleSaveCategory = async (id) => {
        try {
            const response = await editFoodCategory(token, {
                id,
                name: newCategory,
            });
            setCategories(
                categories.map((category) =>
                    category.id === id
                        ? { ...category, name: newCategory }
                        : category
                )
            );
            setEditingCategoryId(null);
            setNewCategory("");
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setNewCategory("");
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteFoodCategory(token, id);

            setCategories(categories.filter((category) => category.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleAddNewCategory = async () => {
        try {
            const response = await addFoodCategory(token, {
                name: newCategory,
            });

            setCategories([...categories, response.data]);
            setNewCategory("");
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {editingCategoryId === category.id ? (
                                        <TextField
                                            value={newCategory}
                                            onChange={(e) =>
                                                setNewCategory(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingCategoryId === category.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    handleSaveCategory(
                                                        category.id
                                                    )
                                                }
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
                                                    handleEditCategory(
                                                        category.id,
                                                        category.name
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteCategory(
                                                        category.id
                                                    )
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
            <div
                style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <TextField
                    label="New Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    onClick={handleAddNewCategory}
                    sx={{ minWidth: 300 }}
                >
                    Add New Category
                </Button>
            </div>
        </div>
    );
};

export default FoodCategories;
