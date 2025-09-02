import HttpService from "../../services/HttpService"
import { addToCart, } from "../types"

export const addToCartFunc = productId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: addToCart.ADD_TO_CART_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/cart/"+productId
    await http.postData(
      path,
      null,
      tokenId,
    )
      .then(() => {
        dispatch({
          type: addToCart.ADD_TO_CART_SUCCESS,
        })
        window.location.reload()
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
          type: addToCart.ADD_TO_CART_ERROR, 
          payload: message,
        })
      })
  }
}
