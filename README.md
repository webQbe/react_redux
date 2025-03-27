# React-Redux Series

1. ([Implementing **Redux Toolkit** for Global State Management with React](https://github.com/webQbe/redux_toolkit))
2. Building a simple **React Bulletin Board** app
3. Creating Async Redux Thunk to **Fetch data** from and **Post data** to a REST API
4. Creating a Blog App that supports all Redux **CRUD operations**
5. Applying **Optimization Techniques** to React-Redux Blog App project
6. Creating Todo List App with **RTK Query** 
7. Adding **RTK Query** with **Normalized Cache State** in **Optimistic Updates** to the React-Redux blog project


## Getting Started 

### Create React App

1. Download and Install **Node.js**
2. Open project folder in VSCode Integrated Terminal

3. Install Vite on terminal:
    - Run `npm create vite@latest .`
    - Select `React` & Enter
    - Select `JavaScript` & Enter

4. Update `vite.config.js` file:
    - Add `server` to `defineConfig()`:
        ```
        server: { 
            port: 3000
        }
        ```
        
5. Install dependencies: Open terminal and run `npm install`

6. Install packages: 
    - **1. `Redux Toolkit`** 
    - **2. `date-fns`** 
    - **3. `Axios`**
    - **4. `React Router 6+`**
    - **5. `FontAwesome`**

    **Run:** 
    ```
    npm i @reduxjs/toolkit react-redux date-fns axios react-router-dom @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
    ```

7. Delete: `public/vite.svg`, `src/assets`, `src/App.css`
8. Modify `src/App.jsx` and `src/main.jsx`
9. Run frontend server with: `npm run dev`
10. Install **React Dev Tools** and **Redux Dev Tools** browser extension
