import { createSelector } from 'reselect'; 
// there are 2 types of selectors; input and output selectors
// input selector does not use 'createSelector'
// output selecotr uses input selectors and 'createSelector'


//input selector
const selectCart = state => state.cart; //returns a slice off of rootReducer


//output selector
export const selectCartItems = createSelector( //createSelector is a memoized selector
  [selectCart], //returns cart object
  cart => cart.cartItems //returns cartItems array off of cart object
);

export const selectCartItemsCount = createSelector(
  [selectCartItems], //returns an array of cartItems
  cartItems => cartItems.reduce((accumalatedQuantity, cartItem)=> accumalatedQuantity+cartItem.quantity,0)
)