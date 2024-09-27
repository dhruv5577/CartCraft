import { createSlice } from "@reduxjs/toolkit"

const initialState={
  user:null,
  isAuthenticate:false,
  loading:true
}

const UserSlice=createSlice({
  initialState,
  name:"UserSlice",
  reducers:{
    setuser(state,action){
      state.user=action.payload
    },
    setauth(state,action){
      state.isAuthenticate=action.payload
    },
    setLoad(state,action){
      state.loading=action.payload
    }
  }
})

export default UserSlice.reducer;

export const {setauth,setuser,setLoad}=UserSlice.actions