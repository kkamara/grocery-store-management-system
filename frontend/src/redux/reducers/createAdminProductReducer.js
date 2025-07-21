import { adminNewProduct, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function createAdminProductReducer (state = initState, action) {
  switch (action.type) {
    
    case adminNewProduct.CREATE_ADMIN_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminNewProduct.CREATE_ADMIN_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminNewProduct.CREATE_ADMIN_PRODUCT_SUCCESS:
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
