
import HttpService from "../../services/HttpService"
import { adminProductEdit, } from "../types"

export const getAdminProductEdit = slug => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminProductEdit.GET_ADMIN_PRODUCT_EDIT_PENDING, })

    const tokenId = "admin-user-token"
    const path = "/admin/products/"+slug+"/edit"
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: adminProductEdit.GET_ADMIN_PRODUCT_EDIT_SUCCESS,
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
          type: adminProductEdit.GET_ADMIN_PRODUCT_EDIT_ERROR, 
          payload: message,
        })
      })
  }
}
