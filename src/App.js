import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';

import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// firevase auth needs to store user information in state, 'App' component have been converted to class component.
class App extends React.Component {
  
  unsubscribeFromAuth = null // new method for closing subscription, default is null

  componentDidMount() {

    const { setCurrentUser } = this.props; //this.props is 'mapDispatchToProps'

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
      // this is an open subscription
      //whenever any changes occur on firebase related to this application, firebase sends massage that auth state changed whether user state updated; signing in/out etc. Then it will give us user info, so we dont have to manually fetch everytime.
      // because it is an open subscription, we have to close subscription when application unmounted for no memory leak
      //Lec 85
      if (userAuth) { //if user signs in, state gets changed
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {  
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data() //.data() to be performed for actual data.
            })
          });

      } else {
        setCurrentUser(userAuth); 
        //meaning, if user signs out(userAuth = null), set 'currentUser' to 'null'
      }
 
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();  // so when this application unmounted, it closes subscription.
  }



  render () {

    return (
      <div>
        <Header /> {/* Header has sign in and out button, so it needs state of currentUser to show sign in or out button aocordingly */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser? (<Redirect to='/'/>): (<SignInAndSignUpPage/>)} />
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

const mapStateToProps = ({user})=> ({ // destructuring 'state' into '{user}'
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
  // dispatch funciton tells redux to dispatch the object passed to all the reducers as action object.
  // 'setCurrentUser(user)' returns an object

  // same as this; setCurrentUser(user) = 'dispatch(setCurrentUser(user))'
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
