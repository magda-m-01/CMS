import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAdmin: sessionStorage.getItem("isAdmin") || null,
        isLoggedIn: sessionStorage.getItem("isLoggedIn") || null,
        token: sessionStorage.getItem("token") || null,
    },
    reducers: {
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
            }
        },
    },
});

export const { setIsAdmin, setIsLoggedIn, setToken } = authSlice.actions;
export default authSlice.reducer;
