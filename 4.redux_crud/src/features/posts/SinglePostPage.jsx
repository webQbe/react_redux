/* Single Post View */
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {

    // Extract postId from the URL
    const { postId } = useParams();

    // Fetch the post 
    const post = useSelector(
        (state) => selectPostById(state, Number(postId))
    )

    /* If post is not found */
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    /* If the post is found */
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p> {/* The title and content. */}
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link> {/* Link to edit post */}
                <PostAuthor userId={post.userId}/> {/* Author */}
                <TimeAgo timestamp={post.date} /> {/* Formatted timestamp */}
            </p>
            <ReactionButtons post={post} /> {/* Reaction buttons  */}
        </article>
    )
}

export default SinglePostPage