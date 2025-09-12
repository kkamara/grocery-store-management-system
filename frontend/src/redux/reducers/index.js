import { combineReducers, } from "redux"
import authReducer from "./authReducer"
import adminAuthReducer from "./adminAuthReducer"
import adminProductsCountStatReducer from "./adminProductsCountStatReducer"
import adminPastMonthOrdersCountStatReducer from "./adminPastMonthOrdersCountStatReducer"
import adminOngoingShipmentsPercentageStatReducer from "./adminOngoingShipmentsPercentageStatReducer"
import adminGuestUsersCountStatReducer from "./adminGuestUsersCountStatReducer"
import adminEarningsLineChartReducer from "./adminEarningsLineChartReducer"
import adminOrdersBarChartReducer from "./adminOrdersBarChartReducer"
import adminSearchProductsReducer from "./adminSearchProductsReducer"
import adminProductReducer from "./adminProductReducer"
import adminDeleteProductReducer from "./adminDeleteProductReducer"
import adminCategoriesReducer from "./adminCategoriesReducer"
import adminManufacturersReducer from "./adminManufacturersReducer"
import createAdminProductReducer from "./createAdminProductReducer"
import productsReducer from "./productsReducer"
import productReducer from "./productReducer"
import adminProductEditReducer from "./adminProductEditReducer"
import editAdminProductDetailsReducer from "./editAdminProductDetailsReducer"
import editAdminProductPhotosReducer from "./editAdminProductPhotosReducer"
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

export default combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  adminProductsCountStat: adminProductsCountStatReducer,
  adminPastMonthOrdersCountStat: adminPastMonthOrdersCountStatReducer,
  adminOngoingShipmentsPercentageStat: adminOngoingShipmentsPercentageStatReducer,
  adminGuestUsersCountStat: adminGuestUsersCountStatReducer,
  adminEarningsLineChart: adminEarningsLineChartReducer,
  adminOrdersBarChart: adminOrdersBarChartReducer,
  adminSearchProducts: adminSearchProductsReducer,
  adminProduct: adminProductReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  adminCategories: adminCategoriesReducer,
  adminManufacturers: adminManufacturersReducer,
  createAdminProduct: createAdminProductReducer,
  products: productsReducer,
  product: productReducer,
  adminProductEdit: adminProductEditReducer,
  editAdminProductDetails: editAdminProductDetailsReducer,
  editAdminProductPhotos: editAdminProductPhotosReducer,
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
})
