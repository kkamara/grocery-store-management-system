import { userAddress, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function userAddressReducer (state = initState, action) {
  switch (action.type) {
    
    case userAddress.GET_USER_ADDRESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case userAddress.GET_USER_ADDRESS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case userAddress.GET_USER_ADDRESS_SUCCESS:
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
