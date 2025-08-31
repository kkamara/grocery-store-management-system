import { editAdminProductDetails, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function editAdminProductDetailsReducer (state = initState, action) {
  switch (action.type) {
    
    case editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_SUCCESS:
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
