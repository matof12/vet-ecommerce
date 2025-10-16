import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAuthUrl = process.env.EXPO_PUBLIC_VET_AUTH_BASE
const authKey = process.env.EXPO_PUBLIC_VET_AUTH_KEY

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl:baseAuthUrl }),
    endpoints: (builder)=>({
        signup: builder.mutation({
            query: (auth)=>({
                url: `accounts:signUp?key=${authKey}`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: (auth)=>({
                url: `accounts:signInWithPassword?key=${authKey}`,
                method: 'POST',
                body: auth
            })
        }),
    })
})

export const {useSignupMutation, useLoginMutation} = authApi