import HttpService from "../../services/HttpService"
import { createCheckout, } from "../types"

export const createCheckoutFunc = userAddress => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: createCheckout.CREATE_CHECKOUT_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/checkout/create-checkout-session"
    await http.postData(
      path,
      { userAddress },
      tokenId,
    )
      .then(res => {
        dispatch({
          type: createCheckout.CREATE_CHECKOUT_SUCCESS,
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
          type: createCheckout.CREATE_CHECKOUT_ERROR, 
          payload: message,
        })
      })
  }
}
