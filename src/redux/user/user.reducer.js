import { UserActionTypes } from './user.types'

const INITIAL_STATE = { // setting the initial value for when reducer gets called for the first time.
  currentUser: null 
}

const userReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default: 
      return state;
  }
}

export default userReducer;