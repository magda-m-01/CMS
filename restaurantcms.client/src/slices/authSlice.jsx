import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAdmin: localStorage.getItem("isAdmin") || null,
        isLoggedIn: localStorage.getItem("isLoggedIn") || null,
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
            localStorage.setItem("isAdmin", action.payload);
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                state.isLoggedIn = true;
                localStorage.setItem("token", action.payload);
                localStorage.setItem("isLoggedIn", true);
            } else {
                state.isLoggedIn = false;
                state.isAdmin = false;
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("isAdmin");
            }
        },
    },
});

export const { setIsAdmin, setIsLoggedIn, setToken } = authSlice.actions;
export default authSlice.reducer;
