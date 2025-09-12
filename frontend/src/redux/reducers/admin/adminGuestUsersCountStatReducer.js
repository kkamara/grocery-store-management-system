import { adminGuestUsersCountStat, } from "../../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminGuestUsersCountStatReducer (state = initState, action) {
  switch (action.type) {
    
    case adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_SUCCESS:
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
