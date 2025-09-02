import HttpService from "../../services/HttpService"
import { cart, } from "../types"

export const getCart = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: cart.GET_CART_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/cart"
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: cart.GET_CART_SUCCESS,
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
          type: cart.GET_CART_ERROR, 
          payload: message,
        })
      })
  }
}
