# React-Redux Performance Techniques & Optimization
This repo is an adaptation of [React Redux Toolkit Tutorials](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo) by Dave Gray. 

I followed the tutorial series to learn followings:
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

## Normalization 
- **Recommended in docs:** Normalized state structure is a recommended approach for storing items.

- **No duplication of data:** Normalization means no duplication of data.
- **Creates an ID lookup:** It also means keeping the item stored in a lookup table by item ID.


## State Shape
A normalized state shape is comprised of an object with an IDs array. 
And the nested entities object that contains all of the items.

   ```
   {
      posts:
         {
            ids: [1,2,3,...],
            entities: {
               '1':{
                     userId: 1,
                     id: 1,
                     title: ...etc.
               }
            }
         }
   }
   ```

### `createEntityAdapter` API
The best part of using of normalized data with Redux Toolkit is `createEntityAdapter` API. It will make your slices less complicated and easier to manage. 

- Abstracts more logic from components
- Built-in CRUD methods
- Automatic selector generation

## Credits
Original tutorial: [React Redux Toolkit Tutorials](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo) — Dave Gray.

## License
MIT License