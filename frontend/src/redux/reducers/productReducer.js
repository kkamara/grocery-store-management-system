import { product, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function productReducer (state = initState, action) {
  switch (action.type) {
    
    case product.GET_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case product.GET_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case product.GET_PRODUCT_SUCCESS:
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
