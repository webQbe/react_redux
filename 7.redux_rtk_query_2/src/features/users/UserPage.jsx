import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice' // to fetch a user by ID
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import { useGetPostsByUserIdQuery } from '../posts/postSlice'

let UserPage = () => {
    const { userId } = useParams() // Retrieve userId from URL

    // Select the user from Redux store
    const user = useSelector(state => selectUserById(state, Number(userId)))

    // Fetch posts filtered by user ID
    const { 
            data: postsForUser, 
            isLoading, 
            isSuccess, 
            isError, 
            error 
        } = useGetPostsByUserIdQuery(userId);
    
   let content;
   if (isLoading) {
        content = <p>Loading...</p>
   } else if (isSuccess) {
        const { ids, entities } = postsForUser
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
   } else if (isError) {
        content = <p>{error}</p>;
   }

  return (
        <section>
            <h2>{user?.name}</h2> {/* User’s name  */}

            <ol>{content}</ol> {/* User's post title list (links) */}
        </section>
  )
}

UserPage = React.memo(UserPage)

export default UserPage