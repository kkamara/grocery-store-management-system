import HttpService from "../../services/HttpService"
import { adminGuestUsersCountStat, } from "../types"

export const getAdminGuestUsersCountStat = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_PENDING, })

    const tokenId = "admin-user-token"
    await http.getData("/stats/admin/users/guest", tokenId)
      .then(res => {
        dispatch({
          type: adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_SUCCESS,
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
          type: adminGuestUsersCountStat.GET_ADMIN_GUEST_USERS_COUNT_STAT_ERROR, 
          payload: message,
        })
      })
  }
}
