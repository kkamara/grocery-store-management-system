import { adminSearchProducts, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminSearchProductsReducer (state = initState, action) {
  switch (action.type) {
    
    case adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_SUCCESS:
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
