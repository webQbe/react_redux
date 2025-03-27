/* Display the Post Author */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
    // Get all users from Redux store
    const users = useSelector(selectAllUsers) 
    // Find the matching user
    const author = users.find(user => user.id === userId); 

  return (
    <span>by {
              author ? 
              
                <Link to={`/user/${userId}`}>
                    {author.name}
                </Link> 

                :  'Unknown author'

              }
    </span>
  )
}

export default PostAuthor