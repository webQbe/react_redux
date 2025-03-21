/* Retrieve and display posts from Redux*/
import { useSelector, useDispatch } from 'react-redux'; 
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postSlice';
import { useEffect } from 'react'; 
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
    const dispatch = useDispatch(); 

    const posts = useSelector(selectAllPosts); 
    // Retrieve the current status of posts
    const postsStatus = useSelector(getPostsStatus);
    // Fetch the error message (if any)
    const error = useSelector(getPostsError);

    // Fetch posts only when needed
    useEffect(() => {
        if(postsStatus === 'idle'){
            dispatch(fetchPosts()) // Fetch posts from the API
        }
        /* This effect will run once when the component mounts and then again whenever postsStatus or dispatch changes.
            - The condition (if (postsStatus === 'idle')) ensures that posts are only fetched once.
            - If postsStatus is already 'succeeded', the effect does not re-fetch posts.
            - Including dispatch prevents potential issues when using Redux in certain environments (like React Strict Mode).
         */
    }, [postsStatus, dispatch])

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