
import HttpService from "../../services/HttpService"
import { product, } from "../types"

export const getProduct = slug => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: product.GET_PRODUCT_PENDING, })

    const tokenId = "user-token"
    const path = "/products/"+slug
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: product.GET_PRODUCT_SUCCESS,
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
          type: product.GET_PRODUCT_ERROR, 
          payload: message,
        })
      })
  }
}
