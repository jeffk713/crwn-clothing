import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // 'connect' is a higher order component like withRouter from 'react-router-dom'

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header=({ currentUser })=> (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser ? (
          <div className='option' onClick={()=> auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )
      }
    </div>
  
  </div>
)

const mapStateToProps = state => ({ //state object is argument, state is 'rootReducer'
// name can be anything but 'mapStateToProps' is standard with redux codebases

currentUser: state.user.currentUser 
//name of property, 'currentUser', will be actual property to pass in component.
//Head component takes 'currentUser' props. so the name of property is 'currenUser'
//value is from 'rootReducer'
});

export default connect(mapStateToProps)(Header); 
// now we get 'currentUser' data from rootReducer, being passed into Head component as currenUser