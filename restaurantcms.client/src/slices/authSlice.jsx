import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAdmin: false,
        isLoggedIn: false,
    },
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { setIsAdmin, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
