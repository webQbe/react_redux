/* TodoList Component  */
import { // Import the mutation hooks from apiSlice
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
 } from '../api/apiSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faToiletPaperSlash, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons' // FontAwesome icons
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

    // Get mutation functions
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    /* Handle form submission */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call addTodo with new todo data
        addTodo({ userId: 1, title: newTodo, completed: false })
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
    } else if (isSuccess) { /* Render list of todos */
        content =  todos.map(todo => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        {/* Checkbox calls updateTodo() to toggle completion status */}
                        <input 
                            type="checkbox" 
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })} 
                        />
                        {/* Display todo */}
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    {/* Delete button calls deleteTodo() to remove a todo */}
                    <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })

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