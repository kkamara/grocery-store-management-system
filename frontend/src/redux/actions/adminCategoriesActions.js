import HttpService from "../../services/HttpService"
import { adminCategories, } from "../types"

export const getAdminCategories = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminCategories.GET_ADMIN_CATEGORIES_PENDING, })

    const tokenId = "admin-user-token"
    await http.getData("/admin/categories", tokenId)
      .then(res => {
        dispatch({
          type: adminCategories.GET_ADMIN_CATEGORIES_SUCCESS,
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
          type: adminCategories.GET_ADMIN_CATEGORIES_ERROR, 
          payload: message,
        })
      })
  }
}
