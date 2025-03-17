/* Retrieve and display posts from Redux*/
import { useSelector } from 'react-redux'; // Used to fetch posts
import { selectAllPosts } from './postSlice'; // Retrieve all posts from the Redux store
import PostAuthor from './PostAuthor'; // Render Posts with Author Info
import TimeAgo from './TimeAgo'; // Render Posts with Timestamps

const PostsList = () => {
    // Retrieve Posts from Redux Store
    const posts = useSelector(selectAllPosts) 

    // Sort Posts by Newest First
    const orderedPosts = posts.slice() // Create a shallow copy of the posts array
                              .sort((a, b) => b.date.localeCompare(a.date)) // Sort posts in descending order (newest posts first) 

    // Map through orderedPosts and create <article> elements for each post
    // Use substring(0, 100) to limit content to 100 characters
    // Include <PostAuthor /> component for each post, pass post.userId as a prop
    // Include <TimeAgo> inside each post, pass post.date as a prop
    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} /> {/* Display Author */}
                <TimeAgo timestamp={post.date} /> {/* Display Timestamp */}
            </p>
        </article>
    ))

    // Return JSX to Display all posts inside <section>
    return(
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default PostsList