import { deleteUserAddress, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function deleteUserAddressReducer (state = initState, action) {
  switch (action.type) {
    
    case deleteUserAddress.DELETE_USER_ADDRESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case deleteUserAddress.DELETE_USER_ADDRESS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case deleteUserAddress.DELETE_USER_ADDRESS_SUCCESS:
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
