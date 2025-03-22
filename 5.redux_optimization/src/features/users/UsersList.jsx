import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    // Fetch all users from Redux store
    const users = useSelector(selectAllUsers)

    // Map through users and display them as a list of links
    const renderedUsers = users.map(user => (
        /* Each link navigate to UserPage based on the user.id. */
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
    
  return (
    <section>
        <h2>Users</h2>
        <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList