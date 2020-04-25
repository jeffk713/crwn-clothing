import { CartActionTypes } from './cart.type';

export const toggleCartHidden = ()=> ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// payload is optional. in the reducer we already toggle the hidden value.

export const addItem = item=> ({
  type: CartActionTypes.ADD_ITEM, 
  payload: item
});