import HttpService from "../../services/HttpService"
import { deleteUserAddress, } from "../types"

export const deleteUserAddressFunc = userAddressId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: deleteUserAddress.DELETE_USER_ADDRESS_PENDING, })

    let tokenId = "user-token"
    if (null === localStorage.getItem(tokenId)) {
      tokenId = ""
    }
    const path = "/user-addresses/"+userAddressId
    await http.delData(
      path,
      tokenId,
    )
      .then(res => {
        dispatch({
          type: deleteUserAddress.DELETE_USER_ADDRESS_SUCCESS,
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
          type: deleteUserAddress.DELETE_USER_ADDRESS_ERROR, 
          payload: message,
        })
      })
  }
}
