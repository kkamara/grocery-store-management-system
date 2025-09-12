import { updateUserAddress, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function updateUserAddressReducer (state = initState, action) {
  switch (action.type) {
    
    case updateUserAddress.UPDATE_USER_ADDRESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case updateUserAddress.UPDATE_USER_ADDRESS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case updateUserAddress.UPDATE_USER_ADDRESS_SUCCESS:
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
