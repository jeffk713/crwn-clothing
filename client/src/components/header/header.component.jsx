import React from 'react';
import { connect } from 'react-redux'; // 'connect' is a higher order component like withRouter from 'react-router-dom'
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart })=> (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo'/>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {
        currentUser ? (
          <OptionLink as='div' onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>
        )
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden? null: <CartDropdown />
    }
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({ //state object is argument, state is 'rootReducer'
// name can be anything but 'mapStateToProps' is standard with redux codebases

// currentUser: state.user.currentUser // with destructuring, this is not needed anymore
//name of property, 'currentUser', will be actual property to pass in component.
//Head component takes 'currentUser' props. so the name of property is 'currenUser'
//value is from 'rootReducer'

currentUser: selectCurrentUser,
hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header); 
// now we get 'currentUser' data from rootReducer, being passed into Head component as currenUser