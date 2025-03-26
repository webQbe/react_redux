/* Header Component */
import { Link } from "react-router-dom" // Re-renders when count updates issue persists
import { useDispatch, useSelector } from "react-redux"
import { increaseCount, getCount } from "../features/posts/postSlice"

const Header = () => {
    const dispatch = useDispatch() // Provide function to dispatch actions
    const count = useSelector(getCount) // Retrieve current count value

    return (
        <header className="header">

            <h1>Redux Blog</h1> {/* Blog title */}

            <nav> {/* Navigation menu */}

                <ul>

                    {/* Navigate between pages without a full reload */}

                    <li><Link to="/">Home</Link></li> {/* Link to homepage */}

                    <li><Link to="post">Post</Link></li> {/* Link to post creation page */}
                    
                    <li><Link to="user">Users</Link></li> {/*  Link to UsersList */}

                </ul>
                
                {/* Add button */}
                <button 
                    // Dispatch increaseCount() to update counter
                    onClick={() => dispatch(increaseCount())}
                >
                    {count} {/* Current count value */}
                </button>

            </nav>
            
        </header>
    )
}

export default Header