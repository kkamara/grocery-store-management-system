
import {
  LoginUserService,
  AuthorizeUserService,
  LogoutUserService,
} from "../../services/AdminAuthService"
import { adminAuth, } from "../types"

export const login = creds => {
  return dispatch => {

    dispatch({ type: adminAuth.ADMIN_AUTH_LOGIN_PENDING, })

    LoginUserService(creds).then(res => {
      dispatch({
        type: adminAuth.ADMIN_AUTH_LOGIN_SUCCESS,
        payload: res,
      })

    }, error => {
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
        type: adminAuth.ADMIN_AUTH_LOGIN_ERROR,
        payload: message,
      })
    })
  }
}

export const authorize = () => {
  return dispatch => {

    dispatch({ type: adminAuth.ADMIN_AUTH_AUTHORIZE_PENDING, })
    const tokenId = "admin-user-token"
    if (localStorage.getItem(tokenId) === null) {
      return dispatch({
        type: adminAuth.ADMIN_AUTH_AUTHORIZE_ERROR,
        payload: "Token not set.",
      })
    }

    AuthorizeUserService().then(res => {
      dispatch({
        type: adminAuth.ADMIN_AUTH_AUTHORIZE_SUCCESS,
        payload: res,
      })

    }, error => {
      if (error.response.status === 401) {
        localStorage.removeItem(tokenId)
        window.location = "/admin"
      }
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
        type: adminAuth.ADMIN_AUTH_AUTHORIZE_ERROR,
        payload: message,
      })
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: adminAuth.ADMIN_AUTH_LOGOUT_PENDING, })

    LogoutUserService().then(res => {
      dispatch({
        type: adminAuth.ADMIN_AUTH_LOGOUT_SUCCESS,
        payload: null,
      })

    }, error => {
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
        type: adminAuth.ADMIN_AUTH_LOGOUT_ERROR,
        payload: message,
      })
    })
  }
}
