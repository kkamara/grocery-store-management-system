import { adminProduct, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminProductReducer (state = initState, action) {
  switch (action.type) {
    
    case adminProduct.GET_ADMIN_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminProduct.GET_ADMIN_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminProduct.GET_ADMIN_PRODUCT_SUCCESS:
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
