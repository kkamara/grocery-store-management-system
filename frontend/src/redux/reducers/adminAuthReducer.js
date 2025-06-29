import { adminAuth, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminAuthReducer (state = initState, action) {
  switch (action.type) {
    
    case adminAuth.ADMIN_AUTH_LOGIN_ERROR:
    case adminAuth.ADMIN_AUTH_LOGOUT_ERROR:
    case adminAuth.ADMIN_AUTH_AUTHORIZE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null
      }
    
    case adminAuth.ADMIN_AUTH_LOGIN_PENDING:
    case adminAuth.ADMIN_AUTH_LOGOUT_PENDING:
    case adminAuth.ADMIN_AUTH_AUTHORIZE_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminAuth.ADMIN_AUTH_LOGIN_SUCCESS:
    case adminAuth.ADMIN_AUTH_LOGOUT_SUCCESS:
    case adminAuth.ADMIN_AUTH_AUTHORIZE_SUCCESS:
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
