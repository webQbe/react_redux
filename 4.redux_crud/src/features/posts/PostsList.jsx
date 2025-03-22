/* Retrieve and display posts from Redux*/
import { useSelector } from 'react-redux'; 
import { selectAllPosts, getPostsStatus, getPostsError } from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {

    const posts = useSelector(selectAllPosts); 
    // Retrieve the current status of posts
    const postsStatus = useSelector(getPostsStatus);
    // Fetch the error message (if any)
    const error = useSelector(getPostsError);


    let content;
    /* Track the fetching status (loading, succeeded, failed). */
    if (postsStatus === 'loading'){
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded'){
        // Sort posts by most recent date
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        // Render <PostsExcerpt /> for each post
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        // Display an error message.
        content = <p>{error}</p>;
    }


    // Return JSX to Display all posts inside <section>
    return(
        <section>
            {content}
        </section>
    )
}
export default PostsList