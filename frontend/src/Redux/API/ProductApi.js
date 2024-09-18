import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const ProductApi=createApi({
  reducerPath:'ProductApi',
  baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
  endpoints:(builder)=>({
    getProducts:builder.query({
      query:(params)=>"/product/getproducts"
    }),
    getProductDesc:builder.query({
      query:(id)=>`/product/${id}`
    })
  })
})


export const {useGetProductsQuery,useGetProductDescQuery}=ProductApi