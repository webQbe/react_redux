/* Component for Adding Posts */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postSlice'; 
import { selectAllUsers } from '../users/usersSlice'; 
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const dispatch = useDispatch() // To dispatch
    const navigate = useNavigate() // To redirect

    /* State for Form Inputs */
    // States for Form Inputs to store user input for the post title and content
    const [title, setTitle ] = useState('');
    const [content, setContent ] = useState('');
    const [userId, setUserId ] = useState('');

    // Request Status State
    const [addRequestStatus, setAddRequestStatus] = useState('idle') // default: 'idle' (no requests)

    // Get users from Redux store
    const users = useSelector(selectAllUsers);

    /* Event Handlers for Input Changes */
    // Update state when the user types in the form fields
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    // Tracks form input values & ensure all fields are filled
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    /* Handle post submission */
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                // Set request status to pending
                setAddRequestStatus('pending')
                // Dispatch addNewPost() & unwrap the promise
                dispatch(addNewPost({ title, body: content, userId }))
                                    .unwrap() // Extract the actual fulfilled value or throw the error if the action was rejected


                // Reset form fields after a successful request
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/') // After adding a new post, redirect to homepage
            } catch (err) { 
                // Handles errors
                console.error('Failed to save the post', err)
            } finally {
                // Resets request status to 'idle'
                setAddRequestStatus('idle')
            }
        }
    }

    /* Create a list of <option> elements for <select> dropdown */
    const usersOptions = users.map( // Iterate over the users array from Redux state
        user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                )
            )
    /* Each <option>:
        Has a unique key (user.id) for React optimization,
        Has a value of user.id (so the selected user ID can be stored),
        Displays user.name in the dropdown
    */

  /* Rendering the Form */
  return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type='text'
                    id='postTitle' 
                    name='postTitle'
                    value={title} 
                    onChange={onTitleChanged} // Update title state
                />
                <label htmlFor="postAuthor">Author:</label>
                {/* Create a dropdown to select an author for the post */}
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea 
                    name="postContent" 
                    id="postContent"
                    value={content} 
                    onChange={onContentChanged} // Update content state
                />
                <button 
                    type='button'
                    onClick={onSavePostClicked} // Add new post
                    disabled={!canSave} // Prevent saving if the form is incomplete
                >
                    Save Post
                </button>
            </form>
        </section>
  )
}

export default AddPostForm