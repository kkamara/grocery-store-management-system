import { combineReducers, } from "redux"
import adminReducers from "./admin/index"
import authReducer from "./authReducer"
import productsReducer from "./productsReducer"
import productReducer from "./productReducer"
import cartReducer from "./cartReducer"
import cartCountReducer from "./cartCountReducer"
import addToCartReducer from "./addToCartReducer"
import deleteCartItemReducer from "./deleteCartItemReducer"
import checkoutReducer from "./checkoutReducer"
import userAddressesReducer from "./userAddressesReducer"
import createCheckoutReducer from "./createCheckoutReducer"
import createUserAddressReducer from "./createUserAddressReducer"
import deleteUserAddressReducer from "./deleteUserAddressReducer"
import userAddressReducer from "./userAddressReducer"
import updateUserAddressReducer from "./updateUserAddressReducer"

const reducers = {
  auth: authReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  cartCount: cartCountReducer,
  addToCart: addToCartReducer,
  deleteCartItem: deleteCartItemReducer,
  checkout: checkoutReducer,
  userAddresses: userAddressesReducer,
  createCheckout: createCheckoutReducer,
  createUserAddress: createUserAddressReducer,
  deleteUserAddress: deleteUserAddressReducer,
  userAddress: userAddressReducer,
  updateUserAddress: updateUserAddressReducer,
}

export default combineReducers({
  ...adminReducers,
  ...reducers,
})
