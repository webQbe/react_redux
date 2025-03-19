/* Manage 'posts' State*/
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns'; // to set sample post timestamps

// Initial state : an array of posts, each with an id, title, and content
const initialState = [
    { 
        id: '1', 
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.", 
        date: sub(new Date(), 
                    { minutes: 10 } // Subtract minutes to simulate past posts
                 ).toISOString(), // Convert the date to an ISO string
        reactions: { // Initial reaction count is 0
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    { 
        id: '2', 
        title: 'Slices...', 
        content: "The more I say slice, the more I want pizza.", 
        date: sub(new Date(), { minutes: 5 }).toISOString(), // 5 minutes ago
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

// Create postsSlice with the name 'posts', using the 'initialState'
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { 
        /* Add reducer to be dispatched by other components */
        postAdded: {
                // reducer() function only handles state updates
                reducer(state, action){
                        // Take new post and add it to the state array
                        state.push(action.payload) 
                    },
                // Use prepare() to keep the action preparation separate
                prepare(title, content, userId) {
                        return {
                            payload: {
                                id: nanoid(), // Generate unique ID
                                title,
                                content,
                                date: new Date().toISOString(),// New posts get the current timestamp
                                userId, // Store the user who created the post
                                // Each post has a reactions object for storing counts
                                reactions: { 
                                    thumbsUp: 0,
                                    wow: 0,
                                    heart: 0,
                                    rocket: 0,
                                    coffee: 0
                                }
                            } 
                            /* Formats the action payload before passing it to the reducer */
                        }
                    },
                
            },
        /* Reducer for Adding Reactions */
        reactionAdded(state, action){
            // Extract postId & reaction from the payload
            const { postId, reaction } = action.payload
            // Finds the post by postId in the Redux store.
            const existingPost = state.find(post => post.id === postId)
            // If the post is found
            if (existingPost){
                // Increment the selected reaction count.
                existingPost.reactions[reaction]++
            }
        }
    } 
})

// Allow components to retrieve all posts from the Redux store
export const selectAllPosts = (state) => state.posts;

// Export the postAdded & reactionAdded actions
export const { postAdded, reactionAdded } = postsSlice.actions

// Export the Reducer, so that it can be used in the Redux store
export default postsSlice.reducer
/* The posts state is managed by postsReducer */
