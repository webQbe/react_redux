/* RTK Query API */
import { createApi, // used to define apiSlice
         fetchBaseQuery // used to fetch data
    } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ // Configure fetchBaseQuery
            baseUrl: 'http://localhost:3500' // Fetch mock data from local JSON server
        }),
    endpoints: (builders) => ({
        getTodos: builders.query({ // Query that fetches todos from the /todos endpoint
            query: () => '/todos',
        })
    })
})

// Export auto-generated hook to access data
export const { useGetTodosQuery } = apiSlice


/* 
 data/db.json contains mock data
    - Simulates a database with a todos array.
    - Each todo has userId, id, title, and completed status.
*/