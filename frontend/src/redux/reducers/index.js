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
})
