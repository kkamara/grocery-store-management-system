import HttpService from "../../services/HttpService"
import { userAddresses, } from "../types"

export const getUserAddresses = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: userAddresses.GET_USER_ADDRESSES_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/user-addresses"
    await http.getData(path, tokenId)
      .then(res => {
        dispatch({
          type: userAddresses.GET_USER_ADDRESSES_SUCCESS,
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
          type: userAddresses.GET_USER_ADDRESSES_ERROR, 
          payload: message,
        })
      })
  }
}
