import { combineReducers, } from "redux"
import authReducer from "./authReducer"
import usersReducer from "./usersReducer"
import adminAuthReducer from "./adminAuthReducer"
import adminProductsCountStatReducer from "./adminProductsCountStatReducer"
import adminPastMonthOrdersCountStatReducer from "./adminPastMonthOrdersCountStatReducer"

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  adminAuth: adminAuthReducer,
  adminProductsCountStat: adminProductsCountStatReducer,
  adminPastMonthOrdersCountStat: adminPastMonthOrdersCountStatReducer,
})
