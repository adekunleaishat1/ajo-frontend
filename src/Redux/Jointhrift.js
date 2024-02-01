import { createSlice } from "@reduxjs/toolkit";

export const joinslice = createSlice({
    name:"join",
    initialState:{
        token: null,
        isseen: false,
        notseen: false
    },
    reducers:{
        Checkingtokensuccessful:(state, action)=>{
            state.token = action.payload
            state.isseen = true
            state.notseen = false
        },
        Checkingtokenfailed:(state, action) =>{
            state.token = action.payload
            state.isseen = false
            state.notseen = true
        }
    }
})

export const { Checkingtokensuccessful,Checkingtokenfailed } = joinslice.actions
export default joinslice.reducer