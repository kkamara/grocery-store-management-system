import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { logout, } from "../../../../redux/actions/adminAuthActions"

export default function LogoutComponent() {
  const dispatch = useDispatch()
  const adminAuthState = useSelector(state => state.adminAuth)

  useEffect(() => {
    dispatch(logout())
  }, [])

  if (adminAuthState.loading) {
    return <div className="container admin-logout-container text-center">
      <Helmet>
        <title>Dashboard Log Out - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return null
}
