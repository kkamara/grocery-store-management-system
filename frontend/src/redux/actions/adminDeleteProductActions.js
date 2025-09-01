import HttpService from "../../services/HttpService"
import { adminDeleteProduct, } from "../types"

export const deleteAdminProduct = slug => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminDeleteProduct.DELETE_ADMIN_PRODUCT_PENDING, })

    const tokenId = "admin-user-token"
    const path = "/admin/products/"+slug
    await http.delData(path, tokenId)
      .then(() => {
        dispatch({
          type: adminDeleteProduct.DELETE_ADMIN_PRODUCT_SUCCESS,
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
          type: adminDeleteProduct.DELETE_ADMIN_PRODUCT_ERROR, 
          payload: message,
        })
      })
  }
}
