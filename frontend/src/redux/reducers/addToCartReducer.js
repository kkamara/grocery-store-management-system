import { addToCart, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function addToCartReducer (state = initState, action) {
  switch (action.type) {
    
    case addToCart.ADD_TO_CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case addToCart.ADD_TO_CART_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case addToCart.ADD_TO_CART_SUCCESS:
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
