import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAdmin: sessionStorage.getItem("isAdmin") || null,
        isLoggedIn: sessionStorage.getItem("isLoggedIn") || null,
        token: sessionStorage.getItem("token") || null,
        username: sessionStorage.getItem("username") || null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
            sessionStorage.setItem("username", action.payload);
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
            sessionStorage.setItem("isAdmin", action.payload);
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                state.isLoggedIn = true;
                sessionStorage.setItem("token", action.payload);
                sessionStorage.setItem("isLoggedIn", true);
            } else {
                state.isLoggedIn = false;
                state.isAdmin = false;
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("isLoggedIn");
                sessionStorage.removeItem("isAdmin");
                sessionStorage.removeItem("username");
            }
        },
    },
});

export const { setUsername, setIsAdmin, setIsLoggedIn, setToken } =
    authSlice.actions;
export default authSlice.reducer;
