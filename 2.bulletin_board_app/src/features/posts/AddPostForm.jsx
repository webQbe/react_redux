/* Component for Adding Posts */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from './postSlice'; // to dispatch the postAdded action
import { selectAllUsers } from '../users/usersSlice'; 

const AddPostForm = () => {

    // Get the dispatch() function
    const dispatch = useDispatch();

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

    /* Dispatching postAdded When "Save Post" Is Clicked */
    const onSavePostClicked = () => {
        if (title && content) { // Check if the title and content fields are filled

            dispatch(
                // Update the Redux store
                postAdded(title, content, userId) // Include selected userId in new post
                /* Cleaner Dispatch Call: 
                    The slice handles payload preparation internally.
                    The component no longer needs to create an object for the new post.
                 */
            )
            /* Clear the input fields after submitting. */
            setTitle('')
            setContent('')
        }
    }

    // Check if all three values are truthy
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    /* If title, content, and userId all exist (not empty, null, or undefined) → canSave is true, if any of them are missing → canSave is false. */

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