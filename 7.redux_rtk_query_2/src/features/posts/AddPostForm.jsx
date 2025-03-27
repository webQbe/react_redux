/* Component for Adding Posts */
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersSlice'; 
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postSlice';

const AddPostForm = () => {

    // Destructure the returned array from useAddNewPostMutation()
    const [addNewPost, { isLoading }] = useAddNewPostMutation()
    
    /* Destructuring the returned array:
        addNewPost → A function that, when called, triggers the mutation (a POST request to create a new post).
        isLoading → A boolean value that tells if the request is currently in progress (true while sending, false when done). 
    */

    const navigate = useNavigate() // To redirect

    /* State for Form Inputs */
    // States for Form Inputs to store user input for the post title and content
    const [title, setTitle ] = useState('');
    const [content, setContent ] = useState('');
    const [userId, setUserId ] = useState('');

    // Get users from Redux store
    const users = useSelector(selectAllUsers);

    /* Event Handlers for Input Changes */
    // Update state when the user types in the form fields
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    // Tracks form input values & ensure all fields are filled
    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    /* Handle post submission */
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                // Call addNewPost to send a new post
                await addNewPost({ title, body: content, userId }).unwrap()        

                // Reset form fields after a successful request
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/') // After adding a new post, redirect to homepage
            } catch (err) { 
                // Handles errors
                console.error('Failed to save the post', err)
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