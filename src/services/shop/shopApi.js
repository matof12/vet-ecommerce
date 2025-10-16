import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseVET = process.env.EXPO_PUBLIC_DATA_VET

export const shopApi=createApi({
    reducerPath: "shopApi",
    baseQuery:fetchBaseQuery({baseUrl:baseVET}),
    endpoints: (builder)=>({
        getCategories: builder.query({query:()=>'categories.json'}),
        getProductsByCategory: builder.query({
            query: (category)=>`products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
            // Convertir objeto en array
            return Object.values(response)
            }
        })
    })
})

export const {useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi