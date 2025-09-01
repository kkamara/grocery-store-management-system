import slugify from "slugify"
import HttpService from "../../services/HttpService"
import { editAdminProductDetails, } from "../types"

export const editProductDetails = (slug, payload) => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_PENDING, })

    const tokenId = "admin-user-token"
    await http.putData(
      "/admin/products/"+slug,
      payload,
      tokenId,
    )
      .then(res => {
        dispatch({
          type: editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_SUCCESS,
          payload: res.data,
        })
        window.location = "/admin/products/"+slugify(payload.name)+"/edit"
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
          type: editAdminProductDetails.UPDATE_ADMIN_PRODUCT_DETAILS_ERROR, 
          payload: message,
        })
      })
  }
}
