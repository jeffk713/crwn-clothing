import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'; we dont need 'thunk' since using 'saga'
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger); 
  // so only development mode uses logger middleware.
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store); //persistor is persist version of store

//export default { store, persistor };