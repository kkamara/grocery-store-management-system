import { createCheckout, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function createCheckoutReducer (state = initState, action) {
  switch (action.type) {
    
    case createCheckout.CREATE_CHECKOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case createCheckout.CREATE_CHECKOUT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case createCheckout.CREATE_CHECKOUT_SUCCESS:
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
