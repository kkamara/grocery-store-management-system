import { adminOngoingShipmentsPercentageStat, } from "../../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function adminOngoingShipmentsPercentageStatReducer (state = initState, action) {
  switch (action.type) {
    
    case adminOngoingShipmentsPercentageStat.GET_ADMIN_ONGOING_SHIPMENTS_PERCENTAGE_STAT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case adminOngoingShipmentsPercentageStat.GET_ADMIN_ONGOING_SHIPMENTS_PERCENTAGE_STAT_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case adminOngoingShipmentsPercentageStat.GET_ADMIN_ONGOING_SHIPMENTS_PERCENTAGE_STAT_SUCCESS:
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
