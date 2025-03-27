/* The Base API Slice */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Create an API slice using createApi() from RTK Query
export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ // Define the base URL for API requests
        // All API calls will use this as the base URL
        baseUrl: 'http://localhost:3500' 
    }), 
    tagTypes: ['Post'], // Declare 'Post' as a tag type for caching and automatic refetching
    endpoints: builders => ({}) // Left empty because actual endpoints are added in postSlice.jsx.
}) 
