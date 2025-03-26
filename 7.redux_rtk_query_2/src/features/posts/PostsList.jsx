/* Retrieve and display posts from Redux*/
import { useSelector } from 'react-redux'; 
import { selectPostIds, getPostsStatus, getPostsError } from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {

    // Get an ordered list of post IDs
    const orderedPostIds = useSelector(selectPostIds);
    // Retrieve the current status of posts
    const postsStatus = useSelector(getPostsStatus);
    // Fetch the error message (if any)
    const error = useSelector(getPostsError);


    let content;
    /* Track the fetching status (loading, succeeded, failed). */
    // Handle loading state
    if (postsStatus === 'loading'){
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded'){

        // Map through orderedPostIds to render PostsExcerpt for each post
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
        
    } else if (postsStatus === 'failed') { // Handle error state
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