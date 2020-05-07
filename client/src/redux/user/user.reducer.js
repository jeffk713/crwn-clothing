import UserActionTypes from './user.types'

const INITIAL_STATE = { // setting the initial value for when reducer gets called for the first time.
  currentUser: null,
  error: null
}

const userReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return{
        ...state, 
        error: action.payload
      };

    default: 
      return state;
  }
}

export default userReducer;