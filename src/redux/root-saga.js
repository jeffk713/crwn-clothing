import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([ //'all' takes an array of saga generators we invoke
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ])
}