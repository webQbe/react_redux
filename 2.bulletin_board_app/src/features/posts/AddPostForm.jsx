/* Component for Adding Posts */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postSlice'; // to dispatch the postAdded action

const AddPostForm = () => {

    // Get the dispatch() function
    const dispatch = useDispatch();

    /* State for Form Inputs */
    // States for Form Inputs to store user input for the post title and content
    const [title, setTitle ] = useState('');
    const [content, setContent ] = useState('');

    /* Event Handlers for Input Changes */
    // Update state when the user types in the form fields
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    /* Dispatching postAdded When "Save Post" Is Clicked */
    const onSavePostClicked = () => {
        if (title && content) { // Check if the title and content fields are filled

            dispatch(
                /* Dispatch postAdded(newPost) to update the Redux store */
                postAdded(
                    /* Create a new post object  */
                    { 
                        id: nanoid(), // A unique id using nanoid()
                        title,
                        content
                    }
                )
            )
            /* Clear the input fields after submitting. */
            setTitle('')
            setContent('')
        }
    }

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
                >
                    Save Post
                </button>
            </form>
        </section>
  )
}

export default AddPostForm