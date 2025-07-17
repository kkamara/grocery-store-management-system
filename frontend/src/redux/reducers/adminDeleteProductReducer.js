import { adminDeleteProduct, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function adminDeleteProductReducer (state = initState, action) {
  switch (action.type) {
    
    case adminDeleteProduct.DELETE_ADMIN_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminDeleteProduct.DELETE_ADMIN_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminDeleteProduct.DELETE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        data: true,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
