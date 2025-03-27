import { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';
import { useUpdatePostMutation, useDeletePostMutation } from './postSlice';


const EditPostForm = () => {

    /* Fetch the Post to Edit */
    const { postId } = useParams(); // extract postId from URL
    const navigate = useNavigate(); // To redirect

    // Destructure the returned arrays 
    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()

    // Fetch the post by its ID from the Redux store
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    // Retrieve all users for the author dropdown.
    const users = useSelector(selectAllUsers);

    /* Set Up Local State */
    // Initialize title, content, and userId from the post
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId( // Pass user id as a number
                                            Number(e.target.value) ); 
    /* Save the Edited Post */
    // Ensure all fields are filled and no other request is in progress
    const canSave = [title, content, userId].every(Boolean) && !isLoading;
    
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                // Call updatePost to update a post
                await updatePost({ id: post.id, title, body: content, userId }).unwrap()

                // Reset the form fields
                setTitle('')
                setContent('')
                setUserId('')
                // Navigate back to the updated post
                navigate(`/post/${postId}`);

            } catch (err) {
                // Otherwise, log the error
                console.error('Failed to save the post', err);
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

    const onDeletePostClicked = async () => {
        try{
            // Call deletePost to delete a post
            await deletePost({ id: post.id }).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/') // Navigate back to the homepage
        } catch (err) {
            console.log('Failed to delete the post', err)
        }
    }

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
                {/* Render Save button */}
                <button
                    type='button'
                    onClick={onSavePostClicked}
                    disabled={!canSave}// Disable unless all conditions in canSave are met
                >
                    Save Post
                </button>
                {/* Render delete button */}
                <button className='deleteButton'
                    type="button"
                    onClick={onDeletePostClicked} // Trigger onDeletePostClicked()
                >
                        Delete Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm