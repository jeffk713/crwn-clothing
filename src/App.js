import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  ); 
  //exact is boolean property 'exact' itself means true 
  //path='/' means the base url such as localhost:3000.
  //component is what we wannna render.
  // --> when the path is the base url, render {HomePage}
  // without 'exact' even tho 'path' is partially true, it will render according 'component' 
  //<Switch> gives us more control over renderingn page, it only renders only one component when it matches. no rendering multiple components. Lec 66. at 6:00
}

export default App;
