
import HttpService from "../../services/HttpService"
import { adminNewProduct, } from "../types"

export const newProduct = payload => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminNewProduct.CREATE_ADMIN_PRODUCT_PENDING, })

    const tokenId = "admin-user-token"
    await http.postFormData(
      "/admin/products",
      payload,
      tokenId,
    )
      .then(res => {
        dispatch({
          type: adminNewProduct.CREATE_ADMIN_PRODUCT_SUCCESS,
          payload: res.data,
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
          type: adminNewProduct.CREATE_ADMIN_PRODUCT_ERROR, 
          payload: message,
        })
      })
  }
}
