# React-Redux Performance Techniques & Optimization

- Applying **Optimization Techniques** to React-Redux Blog App project
- Fixing re-rendering all posts when adding reaction to one post
- **Using Memoized Selector in Redux Toolkit (RTK)**
   A memoized selector is a function that optimizes state-derived computations by caching results. This prevents unnecessary recalculations and improves performance when selecting data from the Redux store.
   Redux Toolkit provides createSelector from reselect, which allows you to create memoized selectors.

## Using React Dev Tools Profiler

### Optimizing Counter Rendering
1. Open **`Users`**  (`/user/`) page & click **`F12`** to open developer tools in the browser
2. Click on `>>` and choose **`Profiler`** from the drop-down menu
3. Open a user page (E.g. `/user/1`) 
4. Click recording button (circle) in the **`Profiler`** 
5. Click counter button 5x times
6. Click recording button again to stop recording
7. Rendered components are shown in orange color
8. Check if irrelevant components are rendered

### Optimizing Reaction Rendering
1. Go to home page
2. Click recording button (circle) in the **`Profiler`** 
5. Click a reaction button 3x times
6. Click recording button again to stop recording
7. Check rendered components