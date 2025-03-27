/* Retrieve and display posts from Redux*/
import { useSelector } from 'react-redux'; 
import { selectPostIds } from './postSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from './postSlice';

const PostsList = () => {

    // Fetch posts and return status flags
    const { 
            isLoading, 
            isSuccess, 
            isError, 
            error 
        } = useGetPostsQuery() 

    // Get an ordered list of post IDs
    const orderedPostIds = useSelector(selectPostIds);

    let content;
    /* Track the fetching status (loading, succeeded, failed). */
    // Handle loading state
    if (isLoading){
        content = <p>"Loading..."</p>;
    } else if (isSuccess){

        // Map through orderedPostIds to render PostsExcerpt for each post
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
        
    } else if (isError) { // Handle error state
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