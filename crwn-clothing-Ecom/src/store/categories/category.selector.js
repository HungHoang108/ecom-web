import { createSelector } from "reselect";

const selectCategoryReducer = (state)=> state.categories;


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
 
    
    return categoriesSlice.categories}
)


export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories)=>{
    return categories.reduce(
      (acc, { title, items }) => {
        acc[title.toLowerCase()] = items;
        return acc;
      },
      {}
    );
  }
)

// (state) => {
//   const categoriesMap = state.categories.categories.reduce(
//     (acc, { title, items }) => {
//       acc[title.toLowerCase()] = items;
//       return acc;
//     },
//     {}
//   );
//   return categoriesMap;
// };