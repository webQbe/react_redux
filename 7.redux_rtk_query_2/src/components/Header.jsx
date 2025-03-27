/* Header Component */
import { Link } from "react-router-dom" // Re-renders when count updates issue persists
 
const Header = () => {

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

            </nav>
            
        </header>
    )
}

export default Header