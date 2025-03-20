/* Users State in Redux */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Users are static for now
const initialState = [] 
/* When the API request succeeds, the fetched users replace the entire state. */

// Async Thunk action fetches user data
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        // Make an HTTP GET request
        const response = await axios.get(USERS_URL);
        // Return the user data array
        return response.data;
    } catch (err){
        // Otherwise, return an error message
        return err.message;
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}, 
    extraReducers(builder){
        // Listen for the fulfilled state
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // Update the Redux store
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer