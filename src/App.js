import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'

import './App.css';

// firevase auth needs to store user information in state, 'App' component have been converted to class component.
const App = ({ checkUserSession, currentUser }) => {
  useEffect(()=> {
    checkUserSession();
  }, [checkUserSession]); 
  //if 'checkUserSession' is a property of the parent component, we will not use checkUserSession in the array.
  //lec 199



  //unsubscribeFromAuth = null // new method for closing subscription, default is null

  // componentDidMount() {
  //   checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
    //   // this is an open subscription
    //   //whenever any changes occur on firebase related to this application, firebase sends massage that auth state changed whether user state updated; signing in/out etc. Then it will give us user info, so we dont have to manually fetch everytime.
    //   // because it is an open subscription, we have to close subscription when application unmounted for no memory leak
    //   //Lec 85
    //   if (userAuth) { //if user signs in, state gets changed
    //     const userRef = await createUserProfileDocument(userAuth)

    //     userRef.onSnapshot(snapShot => {  
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data() //.data() to be performed for actual data from document snapshot.
    //         })
    //       });

    //   } else {
    //     setCurrentUser(userAuth); 
    //     //meaning, if user signs out(userAuth = null), set 'currentUser' to 'null'

    //     // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}) ));
    //     // firebase until function 
    //     // after updating data, no need.
    //   }
 
    // });
  //}

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();  // so when this application unmounted, it closes subscription.
  // }
    return (
      <div>
        <Header /> {/* Header has sign in and out button, so it needs state of currentUser to show sign in or out button aocordingly */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=> currentUser? (<Redirect to='/'/>): (<SignInAndSignUpPage/>)} />
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

const mapStateToProps = createStructuredSelector({ // destructuring 'state' into '{user}'
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview // after updating data, no need.
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
