import { useGetTodosQuery } from '../api/apiSlice' // fetches the list of todos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons' // FontAwesome icons
import { useState } from 'react'

const TodoList = () => {
    // Store new todo
    const [newTodo, setNewTodo] = useState('')

    const { 
        data: todos, 
        isLoading, 
        isSuccess, 
        isError, 
        error 
    } = useGetTodosQuery()

    /* Form Submission */
    const handleSubmit = (e) => {
        e.preventDefault();
        setNewTodo('') // clear the input
    }

    /* Lets users type new todo items */
    const newItemSection = 
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input  type="text" 
                        id="new-todo" 
                        value={newTodo} // Get value for state
                        onChange={(e) => setNewTodo(e.target.value)} // Update state
                        placeholder='Enter new todo'
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    /* Conditional Rendering */
    let content;
    if (isLoading) {
        content = <p>Loading...</p> // "Loading..." when fetching data.
    } else if (isSuccess) {
        content = JSON.stringify(todos) // JSON stringified todos on successful fetch
    } else if (isError) {
        content = <p>{error}</p> // An error message if the request fails
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList 