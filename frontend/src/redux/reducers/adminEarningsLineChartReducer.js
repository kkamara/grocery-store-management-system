import { adminEarningsLineChart, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminEarningsLineChartReducer (state = initState, action) {
  switch (action.type) {
    
    case adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_SUCCESS:
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
