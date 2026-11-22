import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPISlice = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api` }),
    endpoints: (builder) => ({
        getSpecificUser: builder.query({
            query: (email) => `getUser/${email}`
        })
    })
})

export const {useGetSpecificUserQuery} = userAPISlice;