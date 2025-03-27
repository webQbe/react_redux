/* Reaction Component */
import { useAddReactionMutation } from "./postSlice"

// Define reaction emojis
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {

    // Destructure returned array
    const [addReaction] = useAddReactionMutation()

    // Ensure `post.reactions` is always defined
    const reactions = post.reactions || {};

    // Map through each reaction to create buttons
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    /*  Update reactions */
                    // Access current reaction's count
                    const newValue = (reactions[name] || 0) + 1; 
                    // If undefined/no reactions yet, default to 0
                    // On click, increment current reaction's count by 1 

                    /* Calls addReaction() mutation (provided by RTK Query) */
                    addReaction({ 
                        postId: post.id, // Identify which post is being updated
                        reactions: { 
                            ...reactions, // Keep all previous reactions unchanged
                            [name]: newValue // Update only current reaction's count
                        } 
                    })
                }}>
                { emoji } 
                { reactions[name] || 0 } {/* Show current count of that reaction (defaulting to 0 if not set). */}
            </button>
        )
    })

// Render reaction buttons
return <div>{reactionButtons}</div>

}

export default ReactionButtons