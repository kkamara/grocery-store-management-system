import { checkout, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function checkoutReducer (state = initState, action) {
  switch (action.type) {
    
    case checkout.GET_CHECKOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case checkout.GET_CHECKOUT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case checkout.GET_CHECKOUT_SUCCESS:
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
