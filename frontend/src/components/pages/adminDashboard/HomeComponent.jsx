import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import { authorize } from "../../../redux/actions/adminAuthActions"
import Error from "../../layouts/Error"
import { adminDashboardTitle, } from "../../../constants"

export default function HomeComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector((state) => ({
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

  if (state.adminAuth.loading) {
    return (
      <div className="container dashboard-home-container text-center">
        <Helmet>
          <title>Dashboard Home - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      <div className="row">
        <div className="col-md-12">
          <pre>Charts and statistics go here.</pre>
        </div>
      </div>
    </div>
  )
}
