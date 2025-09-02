import HttpService from "../../services/HttpService"
import { cartCount, } from "../types"

export const getCartCount = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: cartCount.GET_CART_COUNT_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/cart/count"
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: cartCount.GET_CART_COUNT_SUCCESS,
          payload: res.data.count,
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
          type: cartCount.GET_CART_COUNT_ERROR, 
          payload: message,
        })
      })
  }
}
