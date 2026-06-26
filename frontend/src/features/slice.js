import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: false,     // nobody is logged in at start
    userData: null       // no user data at start
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isActive = true;
            state.userData = action.payload;
           
        },
        logout: (state) => {
            state.isActive = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;