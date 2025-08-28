import { adminProductEdit, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminEditProductReducer (state = initState, action) {
  switch (action.type) {
    
    case adminProductEdit.GET_ADMIN_PRODUCT_EDIT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminProductEdit.GET_ADMIN_PRODUCT_EDIT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminProductEdit.GET_ADMIN_PRODUCT_EDIT_SUCCESS:
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
