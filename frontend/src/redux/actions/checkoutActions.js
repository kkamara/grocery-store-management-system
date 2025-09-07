import HttpService from "../../services/HttpService"
import { checkout, } from "../types"

export const getCheckout = billingReference => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: checkout.GET_CHECKOUT_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/checkout/"+billingReference
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: checkout.GET_CHECKOUT_SUCCESS,
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
          type: checkout.GET_CHECKOUT_ERROR, 
          payload: message,
        })
      })
  }
}
