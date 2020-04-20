import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

// firevase auth needs to store user information in state, 'App' component have been converted to class component.
class App extends React.Component {
  constructor() {
    super()

    this.state= {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null // new method for closing subscription

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => { 
      // this is an open subscription
      //whenever any changes occur on firebase related to this application, firebase sends massage that auth state changed whether user state updated; signing in/out etc. Then it will give us user info, so we dont have to manually fetch everytime.
      // because it is an open subscription, we have to close subscription when application unmounted for no memory leak
      //Lec 84
      this.setState({ currentUser: user });

      console.log(user); //
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();  // so when this application unmounted, it closes subscription.
  }



  render () {

    return (
      <div>
        <Header currentUser={this.state.currentUser} /> {/* Header has sign in and out button, so it needs state of currentUser to show sign in or out button aocordingly */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    ); 
  }
  //exact is boolean property 'exact' itself means true 
  //path='/' means the base url such as localhost:3000.
  //component is what we wannna render.
  // --> when the path is the base url, render {HomePage}
  // without 'exact' even tho 'path' is partially true, it will render according 'component' 
  //<Switch> gives us more control over renderingn page, it only renders only one component when it matches. no rendering multiple components. Lec 66. at 6:00
}

export default App;
