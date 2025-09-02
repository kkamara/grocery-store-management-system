import { deleteCartItem, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function deleteCartItemReducer (state = initState, action) {
  switch (action.type) {
    
    case deleteCartItem.DELETE_CART_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case deleteCartItem.DELETE_CART_ITEM_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case deleteCartItem.DELETE_CART_ITEM_SUCCESS:
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
