import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setauth, setuser } from '../Actions/UserSlice';


export const UserApi=createApi({
  reducerPath:'UserApi',
  baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
  endpoints:(builder)=>({
    
    getUserdetails:builder.query({
       query:()=>'/user/me',
       transformResponse:(res)=>res.user,
       async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
            const {data}=await queryFulfilled;
            dispatch(setuser(data));
            dispatch(setauth(true))
        } catch (error) {
          console.log(error)
        }
       }
    }),
    
  })
})


export const {useGetUserdetailsQuery}=UserApi