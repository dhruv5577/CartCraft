import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const ProductApi=createApi({
  reducerPath:'ProductApi',
  baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
  endpoints:(builder)=>({
    getProducts:builder.query({
      query:(params)=>({
        url:"/product/getproducts",
        params:{
          page:params?.page,
          keyword:params?.keyword,
          category:params?.category,
          "ratings[gte]":params?.ratings,
          "price[gte]":params?.min,
          "price[lte]":params?.max 
        }
      })
    }),
    getProductDesc:builder.query({
      query:(id)=>`/product/${id}`
    })
  })
})


export const {useGetProductsQuery,useGetProductDescQuery}=ProductApi