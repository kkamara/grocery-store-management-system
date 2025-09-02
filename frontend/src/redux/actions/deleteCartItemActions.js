import HttpService from "../../services/HttpService"
import { deleteCartItem, } from "../types"

export const deleteCartItemFunc = productId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: deleteCartItem.DELETE_CART_ITEM_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/cart/"+productId
    await http.delData(path, tokenId)
      .then(() => {
        dispatch({
          type: deleteCartItem.DELETE_CART_ITEM_SUCCESS,
        })
        // window.location.reload()
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
          type: deleteCartItem.DELETE_CART_ITEM_ERROR, 
          payload: message,
        })
      })
  }
}
