import { createSelector } from 'reselect';

// with hash table data structure, this is not needed anymore
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2, 
//   jackets: 3, 
//   womens: 4,
//   mens: 5
// } 

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
  //Object.keys takes an object and returns an array with keys of the object.
)

export const selectCollection = collectionUrlParam => 
// 'selectCollection' returns 'createSelector' so when calling it, 
//the syntax is "selectCollection(collectionUrlParam)(state)". lec 135 at 5:00
  createSelector(
    [selectCollections],
    collections => 
    collections[collectionUrlParam]
    //collections.find(collection=> collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    // if data is stored in object(hash table data structure), the coding is simpler. 
    //in array, looking for the last element takes loger than the first one.
  )