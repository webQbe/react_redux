/* Main Application - the root component that renders the PostsList */
import PostsList from "./features/posts/PostsList"; 

function App() {

  // <PostsList /> displays the posts
  return (
        <main className="App">
          <PostsList />
        </main>
  );
}

export default App
