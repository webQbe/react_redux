import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice' // to fetch a user by ID
import { selectAllPosts } from '../posts/postSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const { userId } = useParams() // Retrieve userId from URL

    // Select the user from Redux store
    const user = useSelector(state => selectUserById(state, Number(userId)))

    // Filter all posts in the store to show only those written by the user
    const postsForUser = useSelector(state => {
        const allPosts = selectAllPosts(state)
        return allPosts.filter(post => post.userId === Number(userId))
    })

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

export default UserPage