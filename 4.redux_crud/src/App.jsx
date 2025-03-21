/* Main Routing Setup */
import PostsList from "./features/posts/PostsList"; 
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom"; // To define different routes


function App() {
  /* Manage the routing structure of the app */
  return (
        <Routes> {/* Define multiple nested routes */}
          <Route path="/" element={ <Layout /> } />
          <Route index element={ <PostsList /> } /> {/* List of all posts */}
          <Route path="post">
            <Route index element={ <AddPostForm /> }/> {/* Form to add a new post */}
            <Route path=":postId" element={ <SinglePostPage /> }/> {/* Detailed view of a post */}
          </Route>
        </Routes>
  );
}

export default App
