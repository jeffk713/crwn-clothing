import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';


ReactDOM.render( 
  <Provider store={store}> {/* Provider needs to access everything in App so it needs to be a parent of everything */}
    <BrowserRouter> 
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') // <BrowserRouter> gives <App /> all the functionality of routing from 'react-router-dom' library provides.
);
