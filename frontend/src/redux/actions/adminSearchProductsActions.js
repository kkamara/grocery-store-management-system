
import HttpService from "../../services/HttpService"
import { adminSearchProducts, } from "../types"

export const searchAdminProducts = (query = null, page = null) => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_PENDING, })

    const tokenId = "admin-user-token"
    let path = "/admin/products"
    let pathObject = new URLSearchParams
    if (page) {
      pathObject.append("page", page)
    }
    if (query) {
      pathObject.append("query", query)
    }
    const queryString = pathObject.toString()
    if (0 < queryString.length) {
      path += "?"+queryString
    }
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_SUCCESS,
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
          type: adminSearchProducts.GET_ADMIN_SEARCH_PRODUCTS_ERROR, 
          payload: message,
        })
      })
  }
}
