import { CartActionTypes } from './cart.type';

export const toggleCartHidden = ()=> ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// payload is optional. in the reducer we already toggle the hidden value.

export const addItem = item=> ({
  type: CartActionTypes.ADD_ITEM, 
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
})