import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive : true,
    userData : {
        id:1,
        name:"yatharth",
        role: "USER"
    } // {id, role,name,email}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.isActive = true;
            state.userData =  action.payload;
        },
        logout: (state ,action)=>{
            state.isActive = false;
        
    }
        }

})
export const {login , logout} = authSlice.actions;
export default authSlice.reducer;