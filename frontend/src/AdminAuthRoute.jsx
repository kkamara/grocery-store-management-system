import React, { useEffect, } from "react"
import { Outlet, Navigate, } from "react-router"
import { useSelector, useDispatch, } from "react-redux"
import { authorize, } from "./redux/actions/adminAuthActions"

const AdminAuthRoute = ({ redirectPath, }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  if (state.adminAuth.loading) {
    return null
  }

  const tokenId = "admin-user-token"
  const userStorage = localStorage.getItem(tokenId)
  if (state.adminAuth.error || null === userStorage) {
    if (null !== userStorage) {
      localStorage.removeItem(tokenId)
    }
    if (redirectPath) {
      return <Navigate to={redirectPath}/>
    } else {
      return <Navigate to={"/admin/signin"}/>
    }
  }

  return <Outlet/>
}

export default AdminAuthRoute