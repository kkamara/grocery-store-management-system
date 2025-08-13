import { products, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function productsReducer (state = initState, action) {
  switch (action.type) {
    
    case products.GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case products.GET_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case products.GET_PRODUCTS_SUCCESS:
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
