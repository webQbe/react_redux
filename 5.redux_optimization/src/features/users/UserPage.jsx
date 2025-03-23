import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice' // to fetch a user by ID
import { selectAllPosts, selectPostsByUser } from '../posts/postSlice'
import { Link, useParams } from 'react-router-dom'
import React from 'react'

let UserPage = () => {
    const { userId } = useParams() // Retrieve userId from URL

    // Select the user from Redux store
    const user = useSelector(state => selectUserById(state, Number(userId)))

    // Get posts for a specific user
    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId))) 
    /* This improves performance because createSelector memoizes the results, preventing unnecessary re-renders if the state hasn't changed. */

    // Display a title list of the user's posts as links
    const postTitles = postsForUser.map(post => (
        /* Each link navigate to SinglePostPage based on the post.id */
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

  return (
        <section>
            <h2>{user?.name}</h2> {/* User’s name  */}

            <ol>{postTitles}</ol> {/* User's post title list (links) */}
        </section>
  )
}

UserPage = React.memo(UserPage)

export default UserPage