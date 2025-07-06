
import HttpService from "../../services/HttpService"
import { adminOrdersBarChart, } from "../types"

export const getAdminOrdersBarChart = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_PENDING, })

    const tokenId = "admin-user-token"
    await http.getData("/charts/admin/orders", tokenId)
      .then(res => {
        dispatch({
          type: adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_SUCCESS,
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
          type: adminOrdersBarChart.GET_ADMIN_ORDERS_BAR_CHART_ERROR, 
          payload: message,
        })
      })
  }
}
