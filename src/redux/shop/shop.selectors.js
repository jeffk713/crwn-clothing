import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? 
  Object.keys(collections).map(key => collections[key])
  : []
  //Object.keys takes an object and returns an array with keys of the object.
)

export const selectCollection = collectionUrlParam => 
// 'selectCollection' returns 'createSelector' so when calling it, 
//the syntax is "selectCollection(collectionUrlParam)(state)". lec 135 at 5:00
  createSelector(
    [selectCollections],
    collections => (collections ?
    collections[collectionUrlParam]
    : null)
    //collections.find(collection=> collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    // if data is stored in object(hash table data structure), the coding is simpler. 
    //in array, looking for the last element takes loger than the first one.
  )

  export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isfetching
  )

  export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections 
    //!!null, !!0, and !!false are falsy value. But !!anyobject including an empty one is truthy value
  )