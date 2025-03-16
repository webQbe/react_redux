/* Main Application - the root component that renders the PostsList */
import PostsList from "./features/posts/PostsList"; 
import AddPostForm from "./features/posts/AddPostForm";

function App() {

  /* Render components */
  return (
        <main className="App">
          <AddPostForm />
          <PostsList />
        </main>
  );
}

export default App
