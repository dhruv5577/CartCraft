import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { UserApi } from './UserApii';


export const AuthApi=createApi({
  reducerPath:'AuthApi',
  baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
  endpoints:(builder)=>({

    registration:builder.mutation({
      query(body){
        return {
          url:'/user/register',
          method:'POST',
          body
        }
      },
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          await queryFulfilled;
          await dispatch(UserApi.endpoints.getUserdetails.initiate(null))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    
    login:builder.mutation({
      query(body){
        return {
          url:'/user/login',
          method:'POST',
          body
        }
      },
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          await queryFulfilled;
          await dispatch(UserApi.endpoints.getUserdetails.initiate(null))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logout:builder.query({
      query:()=>"/user/logout"
    })
    
  })
})


export const {useLoginMutation,useRegistrationMutation,useLazyLogoutQuery}=AuthApi