/* Users State in Redux */
import { createSlice } from "@reduxjs/toolkit";

// Users are static for now
const initialState = [
    { id: '0', name: 'Dude Lebowski' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Dave Gray' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{} // No actions yet, just storing data
})

// Exports selector function to get all users
export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer