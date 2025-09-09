import HttpService from "../../services/HttpService"
import { createUserAddress, } from "../types"

export const newUserAddress = payload => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: createUserAddress.CREATE_USER_ADDRESS_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/user-addresses/new"
    await http.postData(
      path,
      payload,
      tokenId,
    )
      .then(res => {
        dispatch({
          type: createUserAddress.CREATE_USER_ADDRESS_SUCCESS,
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
          type: createUserAddress.CREATE_USER_ADDRESS_ERROR, 
          payload: message,
        })
      })
  }
}
