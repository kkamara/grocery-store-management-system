import { adminPastMonthOrdersCountStat, } from "../../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminPastMonthOrdersCountStatReducer (state = initState, action) {
  switch (action.type) {
    
    case adminPastMonthOrdersCountStat.GET_ADMIN_PAST_MONTH_ORDERS_COUNT_STAT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminPastMonthOrdersCountStat.GET_ADMIN_PAST_MONTH_ORDERS_COUNT_STAT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminPastMonthOrdersCountStat.GET_ADMIN_PAST_MONTH_ORDERS_COUNT_STAT_SUCCESS:
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
