/* Redux State Management */
import { 
        createSelector, 
        createEntityAdapter 
    } from "@reduxjs/toolkit";
import { sub } from 'date-fns'; 
import { apiSlice } from "../api/apiSlice"; 
/*  Extending apiSlice with Endpoints:
    apiSlice is extended by adding specific API endpoints related to posts.
    The injectEndpoints method allows adding endpoints dynamically.
*/

// Simplify CRUD operations by structuring state in an object format (entities and ids)
const postsAdapter = createEntityAdapter({
    // Store posts in descending order by date
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// Provide an initial normalized state
const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    /* Key API Endpoints */
    endpoints: builder => ({
        // Fetch all posts
        getPosts: builder.query({ 
            query: () => '/posts', // Fetch a list of posts from /posts
            transformResponse: resposeData => {
                let min = 1;
                const loadedPosts = resposeData.map(post => {
                    // Adds a timestamp (date)
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // Add default reactions if missing
                    if (!post?.reactions) post.reaction = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            // Set up caching
            /* This ensures posts are automatically refetched when modified */
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        // Fetch Posts by a Specific User
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`, // Fetch posts from a specific user
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reaction = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                console.log(result)
                return [
                    ...result.ids.map(id => ({ type: 'Post', id }))
                ]
            }
        }),
        // Add a New Post
        addNewPost: builder.mutation({
            // Send a POST request to add a new post
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            // Refetch getPosts() after a new post is added
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        // Edit an Existing Post
        updatePost: builder.mutation({
            // Send a PUT request to update a post
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            // Invalidate the post’s cache, forcing a refetch
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        // Remove a Post
        deletePost: builder.mutation({
            // Sends a DELETE request to remove a post
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            // Trigger a cache update by invalidating the post
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        // Update Reactions
        addReaction: builder.mutation({
            // Use PATCH to update reactions
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            /* Optimistically update the UI before the request completes */
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }){
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }), 
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

/* Export Selectors */
export const {
    selectAll: selectAllPosts, // Retrieves all posts
    selectById: selectPostById, // Fetches a post by ID
    selectIds: selectPostIds // Retrieves an array of post IDs
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)