/* Display the Post Author */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    // Get all users from Redux store
    const users = useSelector(selectAllUsers) 
    // Find the matching user
    const author = users.find(user => user.id === userId); 

  return (
    // Display the author's name or fallback text
    <span>by {author ? author.name : 'Unknown author'}</span>
  )
}

export default PostAuthor