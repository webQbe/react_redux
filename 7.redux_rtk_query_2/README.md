# RTK Query with Normalized Cache state in Optimistic Updates

- Adding **RTK Query** with **Normalized Cache State** in **Optimistic Updates** to React-Redux blog project
- Using **JSON-Server** as the backend

## Getting started
1. Go to project directory in VSCode terminal
2. Install JSON-Server: `npm i json-server -g`
3. Start the server: `json-server --watch data/db.json --port 3500`


## Inspecting with Redux Dev Tools browser extension
1. Open the blog app and go to `/user/1`
2. Open the extension on the browser: Press **F12** and select **Redux**
3. Select `State` > `Tree` > to see as expandable list
4. Expand `api` > `queries` 
5. See methods used: `getPosts()` & `getPostsByUserId("1")`
6. Expand the methods to see their info:  
    `getPosts()` > `data` 
        > `ids` (IDs array)
        > `entities` > `2 (pin) : {...}` (An object with a number)
7. Click `Diff` to see any changes you make

## Inpecting Network Requests

1. Open blog app and press **F12** and select **Network** > **XHR** tab
2. Open user link at the top *(E.g. Request is sent to `posts/?userId=1`)*
3. Go to a post and open the user page again (No request is sent due to caching)
4. Open users list (`/user`) and open another user page *(E.g. Request is sent to `/posts/?userId=10`)* 
5. Check if this request is also cached by repeating step 3
6. Open a post by the user, & click **Edit Post** link, change post text, and click **Save Post**
7. Check for **`PUT`** request to `/posts/{*id*}`
8. Ensure cache is invalidated by a **`GET`** request to `/posts`
9. Click on a reaction button to inspect requests