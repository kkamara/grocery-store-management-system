
import HttpService from "../../services/HttpService"
import { editAdminProductPhotos, } from "../types"

export const editProductPhotos = (slug, payload) => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_PENDING, })

    const tokenId = "admin-user-token"
    await http.putFormData(
      "/admin/products/"+slug+"/photos",
      payload,
      tokenId,
    )
      .then(res => {
        dispatch({
          type: editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_SUCCESS,
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
          type: editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_ERROR, 
          payload: message,
        })
      })
  }
}
