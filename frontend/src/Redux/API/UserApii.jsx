import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setauth, setLoad, setuser } from '../Actions/UserSlice';


export const UserApi=createApi({
  reducerPath:'UserApi',
  baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
  tagTypes:["User"],
  endpoints:(builder)=>({
    
    getUserdetails:builder.query({
       query:()=>'/user/me',
       transformResponse:(res)=>res.user,
       async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
            const {data}=await queryFulfilled;
            dispatch(setuser(data));
            dispatch(setauth(true));
            dispatch(setLoad(false))
        } catch (error) {
          dispatch(setLoad(false))
          console.log(error)
        }
       },
        providesTags:["User"]
    }),

    updateuser:builder.mutation({
      query(body){
        return {
          url:"/user/updateprofile",
          method:'PUT',
          body
        }
      },
      invalidatesTags:['User']
    }),

    uploadlogo:builder.mutation({
      query(body){
        return {
          url:"/user/updatelogo",
          method:'PUT',
          body
        }
      },
      invalidatesTags:['User']
    }),
    
    updatepassword:builder.mutation({
      query(body){
        return {
          url:"/user/updatepass",
          method:'PUT',
          body
        }
      },
    }),

  })
})


export const {useGetUserdetailsQuery,useUpdateuserMutation,useUploadlogoMutation,useUpdatepasswordMutation}=UserApi