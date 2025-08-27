
import HttpService from "../../services/HttpService"
import { adminProduct, } from "../types"

export const getAdminProduct = slug => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminProduct.GET_ADMIN_PRODUCT_PENDING, })

    const tokenId = "admin-user-token"
    const path = "/admin/products/"+slug
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: adminProduct.GET_ADMIN_PRODUCT_SUCCESS,
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
          type: adminProduct.GET_ADMIN_PRODUCT_ERROR, 
          payload: message,
        })
      })
  }
}
