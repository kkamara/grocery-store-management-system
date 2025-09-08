import { userAddresses, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function userAddressesReducer (state = initState, action) {
  switch (action.type) {
    
    case userAddresses.GET_USER_ADDRESSES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case userAddresses.GET_USER_ADDRESSES_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case userAddresses.GET_USER_ADDRESSES_SUCCESS:
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
