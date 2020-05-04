import { takeEvery, call, put } from 'redux-saga/effects'; //listens to every action we pass into

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get(); // like async await
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot) 
    // call is to invoke a funciton.
    // syntax first parameter is funciton to invoke and seond is the parameter of the function 
    // yield is for the case when the function takes longer than expected
    yield put(fetchCollectionsSuccess(collectionsMap));
    // put is to dispatch aciton
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }

    // collectionRef
    //   .get()
    //   .then(snapshot => { 
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    //   })
    //   .catch( error => dispatch(fetchCollectionsFailure(error.message)) )
}


export function* fetchCollectionsStart() {
  yield takeEvery( // takeEvery does not pause JS while waiting for async request. also it can cancel a function.
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}