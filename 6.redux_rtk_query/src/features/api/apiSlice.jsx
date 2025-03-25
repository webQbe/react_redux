/* API Slice */
import { createApi, // used to define apiSlice
         fetchBaseQuery // used to fetch data
    } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ // Configure fetchBaseQuery
            baseUrl: 'http://localhost:3500' // Fetch mock data from local JSON server
        }),
    /* Define mutation endpoints */
    endpoints: (builders) => ({
        getTodos: builders.query({ // Query that fetches todos from the /todos endpoint
            query: () => '/todos',
        }),
        addTodo: builders.mutation({ // Send POST request to /todos with a new todo item
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            })
        }),
        updateTodo: builders.mutation({ // Send PATCH request to update a specific todo by id
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            })
        }),
        deleteTodo: builders.mutation({ // Send DELETE request to remove a todo by id
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            })
        }),
    })
})

/* Export corresponding mutation endpoint hooks for use in components */
export const { 
        useGetTodosQuery,
        useAddTodoMutation,
        useUpdateTodoMutation,
        useDeleteTodoMutation
} = apiSlice


/* 
 data/db.json contains mock data
    - Simulates a database with a todos array.
    - Each todo has userId, id, title, and completed status.
*/