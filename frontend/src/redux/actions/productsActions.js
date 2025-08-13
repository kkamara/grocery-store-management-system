
import HttpService from "../../services/HttpService"
import { products, } from "../types"

export const getProducts = page => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: products.GET_PRODUCTS_PENDING, })

    const tokenId = "user-token"
    const path = page ? "/products/?page="+page : "/products"
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: products.GET_PRODUCTS_SUCCESS,
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
          type: products.GET_PRODUCTS_ERROR, 
          payload: message,
        })
      })
  }
}
