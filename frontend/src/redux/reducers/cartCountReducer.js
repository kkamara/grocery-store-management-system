import { cartCount, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function cartCountReducer (state = initState, action) {
  switch (action.type) {
    
    case cartCount.GET_CART_COUNT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case cartCount.GET_CART_COUNT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case cartCount.GET_CART_COUNT_SUCCESS:
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
