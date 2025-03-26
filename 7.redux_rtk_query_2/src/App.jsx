/* Main Routing Setup */
import PostsList from "./features/posts/PostsList"; 
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom"; // To define different routes


function App() {
  /* Manage the routing structure of the app */
  return (

        <Routes> {/* Define multiple nested routes */}

          <Route path="/" element={ <Layout /> }> {/* Layout wrapper for all pages */}

            <Route index element={ <PostsList /> } /> {/* List of all posts */}

            <Route path="post">

              <Route index element={ <AddPostForm /> }/> {/* Form to add a new post */}

              <Route path=":postId" element={ <SinglePostPage /> }/> {/* Detailed view of a post */}
              
              <Route path="edit/:postId" element={ <EditPostForm /> }/> {/* Register edit post route */}

            </Route>

            <Route path="user">

              {/* Path "/user" renders UsersList */}
              <Route index element={<UsersList />} /> 

              {/* Path "/user/:userId" renders UserPage (showing a specific user). */}
              <Route path=":userId" element={<UserPage />} />

            </Route>
            
            {/* catch all - replace with 404 component if you want */}
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Route> 

        </Routes>
  );
}
export default App
