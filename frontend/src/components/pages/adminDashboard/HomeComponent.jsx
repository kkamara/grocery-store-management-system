import React, { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { authorize, } from "../../../redux/actions/adminAuthActions"
import Error from "../../layouts/Error"
import { adminDashboardTitle, } from "../../../constants"

export default function HomeComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (false === state.adminAuth.loading && !state.adminAuth.data) {
      window.location.href = "/admin/signin"
    }
  }, [state.adminAuth])

  const logoutDashboard = () => {
    window.location = "/admin/user/logout"
  }

  if (state.adminAuth.loading) {
    return <div className="container dashboard-home-container text-center">
      <Helmet>
        <title>Dashboard Home - {adminDashboardTitle}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className="container dashboard-home-container">
    <Helmet>
      <title>Dashboard Home - {adminDashboardTitle}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <h3>DashboardHomeComponent</h3>
      <button onClick={logoutDashboard} className="btn btn-primary">Logout</button>
    </div>
  </div>
}
