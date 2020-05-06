import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart}) => {
  const [ userCredentials, setCredentials ] = useState({email:'', password:''})
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    
    // const { emailSignInStart} = this.props;
    // const { email, password } = this.state;

    emailSignInStart(email, password);
    
    // no more setState. Redux will handle the state from here on out with sagas
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email:'', password:'' });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const handleChange = event => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value})
  }

    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email</span>

        <form onSubmit={handleSubmit}>
          <FormInput
           name='email'
           type='email' 
           handleChange={handleChange} 
           value={email}
           label='email' 
           required
          />
          <FormInput 
            name='password' 
            type='password' 
            value={password}
            handleChange={handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign In </CustomButton>
            <CustomButton 
              type='button' // without this, 'Custombutton will still submit, just nature of button 
              onClick={googleSignInStart} 
              isGoogleSignIn 
            > 
              Sign In with Google 
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }


const mapDispatchToProps = dispatch =>({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);