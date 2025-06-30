import { adminProductsCountStat, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminProductsCountStatReducer (state = initState, action) {
  switch (action.type) {
    
    case adminProductsCountStat.GET_ADMIN_PRODUCTS_COUNT_STAT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminProductsCountStat.GET_ADMIN_PRODUCTS_COUNT_STAT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminProductsCountStat.GET_ADMIN_PRODUCTS_COUNT_STAT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
