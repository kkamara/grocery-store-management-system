import HttpService from "../../services/HttpService"
import { userAddress, } from "../types"

export const getUserAddress = userAddressId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: userAddress.GET_USER_ADDRESS_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/user-addresses/"+userAddressId
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: userAddress.GET_USER_ADDRESS_SUCCESS,
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
          type: userAddress.GET_USER_ADDRESS_ERROR, 
          payload: message,
        })
      })
  }
}
