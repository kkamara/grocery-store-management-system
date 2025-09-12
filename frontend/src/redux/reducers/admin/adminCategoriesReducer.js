import { adminCategories, } from "../../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminCategoriesReducer (state = initState, action) {
  switch (action.type) {
    
    case adminCategories.GET_ADMIN_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminCategories.GET_ADMIN_CATEGORIES_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminCategories.GET_ADMIN_CATEGORIES_SUCCESS:
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
