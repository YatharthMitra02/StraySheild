import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : true,
    userData : {}
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.status.status = true;
            state.userData =  action.payload;
        },
        logout: (state ,action)=>{
            state.status = false;
        
    }
        }

})
export const {login , logout} = authSlice.actions;
export default authSlice.reducer;