/* Reaction Component */
import { useDispatch } from "react-redux"; 
import { reactionAdded } from "./postSlice";

// Define reaction emojis
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    // Map through each reaction to create buttons
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => 
                    // Dispatch reactionAdded action when button is clicked
                    dispatch(reactionAdded(
                        // Dispatch postId and reaction with reactionAdded
                        { postId: post.id, reaction: name }
                    ))
                }>
                {/* Display the emoji & reaction count */}
                { emoji /* If name = "thumbsUp", then emoji = "👍" */ } 
                { post.reactions[name] /* Accesses the reaction count */ }
            </button>
        )
    })

return <div>{reactionButtons}</div>

}

export default ReactionButtons