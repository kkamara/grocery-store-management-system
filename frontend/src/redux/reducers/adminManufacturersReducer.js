import { adminManufacturers, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminManufacturersReducer (state = initState, action) {
  switch (action.type) {
    
    case adminManufacturers.GET_ADMIN_MANUFACTURERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminManufacturers.GET_ADMIN_MANUFACTURERS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminManufacturers.GET_ADMIN_MANUFACTURERS_SUCCESS:
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
