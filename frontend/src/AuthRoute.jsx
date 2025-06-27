import React, { useEffect, } from "react"
import { Outlet, } from "react-router"
import { useSelector, } from "react-redux"

const AuthRoute = ({ redirectPath, }) => {
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {
    if (state.auth.error || null === localStorage.getItem("user-token")) {
      localStorage.removeItem("user-token")
      if (redirectPath) {
        window.location.href = redirectPath
      } else {
        window.location.href = "/user/signin"
      }
    }
  }, [state.auth])

  return <Outlet/>
}

export default AuthRoute