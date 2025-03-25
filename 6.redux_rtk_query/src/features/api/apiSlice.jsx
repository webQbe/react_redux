/* API Slice */
import { createApi, // used to define apiSlice
         fetchBaseQuery // used to fetch data
    } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ // Configure fetchBaseQuery
            baseUrl: 'http://localhost:3500' // Fetch mock data from local JSON server
        }),
    tagTypes: ['Todos'], // Register 'Todos' tag to track changes in the todo list.

    /* Define mutation endpoints */
    endpoints: (builders) => ({
        getTodos: builders.query({ // Query that fetches todos from the /todos endpoint
            query: () => '/todos',
            providesTags: ['Todos'] // Provide data under the 'Todos' tag
            /* This tells RTK Query that this tag represents the list of todos */
        }),
        addTodo: builders.mutation({ // Send POST request to /todos with a new todo item
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            // Each mutation (add, update, delete) invalidates the 'Todos' tag
            invalidatesTags: ['Todos']
            /* After any of these mutations occur, RTK Query automatically refetches the getTodos query, to ensure the UI always displays the latest todo list without manually triggering a refetch. */
        }),
        updateTodo: builders.mutation({ // Send PATCH request to update a specific todo by id
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builders.mutation({ // Send DELETE request to remove a todo by id
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
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