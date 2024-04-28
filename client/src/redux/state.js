import {createSlice} from '@reduxjs/toolkit'
const initialState={
    user:null,
    token:null,
}
const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.token=action.payload.token,
            state.user=action.payload.user
        },
        resetUser:(state)=>{
            state.token=null,
            state.user=null
        },
        setLisitings:(state,action)=>{
            state.listings=action.payload.listings
        },
        setPropertyList:(state,action)=>{
            state.user.propertyList=action.payload
        },
        setTripList:(state,action)=>{
            state.user.tripList=action.payload
        },
        setwishList:(state,action)=>{
            state.user.wishList=action.payload
        }
    }
})

export const userActions=userSlice.actions
export default userSlice                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
