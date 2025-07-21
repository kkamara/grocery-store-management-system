
import HttpService from "../../services/HttpService"
import { adminManufacturers, } from "../types"

export const getAdminCategories = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminManufacturers.GET_ADMIN_MANUFACTURERS_PENDING, })

    const tokenId = "admin-user-token"
    await http.getData("/admin/manufacturers", tokenId)
      .then(res => {
        dispatch({
          type: adminManufacturers.GET_ADMIN_MANUFACTURERS_SUCCESS,
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
          type: adminManufacturers.GET_ADMIN_MANUFACTURERS_ERROR, 
          payload: message,
        })
      })
  }
}
