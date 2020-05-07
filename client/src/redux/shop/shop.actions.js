import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

//thunk action
export const fetchCollectionsStartAsync = () => { //using redux-thunk, we use a function returning a function 
  return dispatch => { // returning a function that has dispatch props lec. 174
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => { 
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch( error => dispatch(fetchCollectionsFailure(error.message)) )
  }
}
// if redux-thunk middleware is enabled, any time you attempt to dispatch a function instaed of an object, 
// the middleware will call that function with dispatch method itself as the first argument.

