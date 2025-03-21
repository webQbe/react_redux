/* Post Preview in List */
import React from 'react'
import PostAuthor from './PostAuthor'; // Render Posts with Author Info
import TimeAgo from './TimeAgo'; // Render Posts with Timestamps
import ReactionButtons from './ReactionButtons' // Render Posts with Reaction Buttons and Counts
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => { // Receive post as a prop from PostsList.jsx
  return (
    <article>
            <h2>{post.title}</h2>
            <p className='excerpt'>{post.body.substring(0, 75)}...</p> {/* Show only first 75 characters of the post*/}
            <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link> {/* "View Post" button links to /post/:postId */}
                <PostAuthor userId={post.userId} /> {/* Post author */}
                <TimeAgo timestamp={post.date} /> {/* Timestamp */}
            </p>
            <ReactionButtons post={post}/> {/* Reaction buttons  */}
        </article>
  )
}

export default PostsExcerpt