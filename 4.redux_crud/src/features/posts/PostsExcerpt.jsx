/* Render Individual Post Preview */
import React from 'react'
import PostAuthor from './PostAuthor'; // Render Posts with Author Info
import TimeAgo from './TimeAgo'; // Render Posts with Timestamps
import ReactionButtons from './ReactionButtons' // Render Posts with Reaction Buttons and Counts

const PostsExcerpt = ({ post }) => { // Receive post as a prop from PostsList.jsx
  return (
    <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p> {/* Post body truncated to 100 characters */}
            <p className="postCredit">
                <PostAuthor userId={post.userId} /> {/* Post author */}
                <TimeAgo timestamp={post.date} /> {/* Timestamp */}
            </p>
            <ReactionButtons post={post}/> {/* Reaction buttons  */}
        </article>
  )
}

export default PostsExcerpt