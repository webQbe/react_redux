import { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';


const EditPostForm = () => {

    /* Fetch the Post to Edit */
    const { postId } = useParams(); // extract postId from URL
    const navigate = useNavigate();

    // Fetch the post by its ID from the Redux store
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    // Retrieve all users for the author dropdown.
    const users = useSelector(selectAllUsers);

    /* Set Up Local State */
    // Initialize title, content, and userId from the post
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    // Manage API call states (idle or pending)
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);
    
    /* Save the Edited Post */
    // Ensure all fields are filled and no other request is in progress
    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';
    
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                // Update API call state
                setRequestStatus('pending');

                // Send the updated data to the server
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

                // Reset the form fields
                setTitle('')
                setContent('')
                setUserId('')
                // Navigate back to the updated post
                navigate(`/post/${postId}`);

            } catch (err) {
                // Otherwise, log the error
                console.error('Failed to save the post', err);

            } finally {
                // Reset API call state
                setRequestStatus('idle');

            }
        }
    }

    const userOptions = users.map(user => (
        <option 
            key={user.id}
            value={user.id}>
                {user.name}
        </option>
    ))

    /* Rendering the Form */
    return (
        <section>
            <h2>Edit Post</h2>
            <form> {/* <form> with input fields and a dropdown for the author */}
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                 />
                 <label htmlFor="postAuthor">Author: </label>
                 <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                 </select>
                 <label htmlFor="postContent">Content:</label>
                 <textarea 
                    name="postContent" 
                    id="postContent"
                    value={content}
                    onChange={onContentChanged} />
                <button
                    type='button'
                    onClick={onSavePostClicked}
                    disabled={!canSave} // button is disabled unless all conditions in canSave are met
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm