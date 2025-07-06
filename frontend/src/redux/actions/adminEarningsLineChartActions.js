
import HttpService from "../../services/HttpService"
import { adminEarningsLineChart, } from "../types"

export const getAdminEarningsLineChart = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_PENDING, })

    const tokenId = "admin-user-token"
    await http.getData("/charts/admin/earnings", tokenId)
      .then(res => {
        dispatch({
          type: adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_SUCCESS,
          payload: res.data.data,
        })
      }).catch(error => {
        let message
        if ("ERR_NETWORK" === error.code) {
          message = "Server unavailable."
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          message = error.response.data.error
        } else {
          message = "Something went wrong. Please come back later."
        }
        dispatch({ 
          type: adminEarningsLineChart.GET_ADMIN_EARNINGS_LINE_CHART_ERROR, 
          payload: message,
        })
      })
  }
}
