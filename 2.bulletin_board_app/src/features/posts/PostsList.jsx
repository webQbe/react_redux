/* Retrieve and display posts from Redux*/
import { useSelector } from 'react-redux'; // Used to fetch posts
import { selectAllPosts } from './postSlice'; // Retrieve all posts from the Redux store
import PostAuthor from './PostAuthor'; // Render Posts with Author Info

const PostsList = () => {
    // Retrieve Posts from Redux Store
    const posts = useSelector(selectAllPosts) 

    // Map over the list of posts and creates <article> elements for each post
    // Use substring(0, 100) to limit content to 100 characters
    // Include <PostAuthor /> component for each post, pass post.userId as a prop
    const renderedPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor 
                    userId={post.userId} /* display the correct author for each post */
                />
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