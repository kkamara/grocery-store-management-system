import { adminOrdersBarChart, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminOrdersBarChartReducer (state = initState, action) {
  switch (action.type) {
    
    case adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_SUCCESS:
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
